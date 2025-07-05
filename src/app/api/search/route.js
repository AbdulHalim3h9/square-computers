import { NextResponse } from 'next/server';
import { products } from '@/data/products';

// Helper function to calculate search score for a product
function calculateSearchScore(product, query) {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let score = 0;
  const name = product.name.toLowerCase();
  const description = product.description.toLowerCase();
  const category = product.category.toLowerCase();
  const details = product.details.join(' ').toLowerCase();
  
  // Exact matches get highest priority
  if (name === query) score += 100;
  
  // Check each query term
  for (const term of queryTerms) {
    // Name matches are most important
    if (name.includes(term)) {
      // Exact match in name gets higher score
      if (name.split(/\s+/).includes(term)) {
        score += 30;
      } else {
        score += 20;
      }
    }
    
    // Category matches are also important
    if (category.includes(term)) {
      score += 25;
    }
    
    // Check in details
    const detailMatches = product.details.map(d => d.toLowerCase().includes(term)).filter(Boolean).length;
    if (detailMatches > 0) {
      score += 5 * detailMatches; // More matches in details = higher score
    }
    
    // Description matches get lower priority
    if (description.includes(term)) {
      score += 5;
    }
  }
  
  return score;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    // Get all products with their search scores
    const resultsWithScores = products
      .map(product => ({
        ...product,
        score: calculateSearchScore(product, query)
      }))
      .filter(item => item.score > 0) // Only include products with some match
      .sort((a, b) => b.score - a); // Sort by score in descending order

    // Remove the score before returning
    const results = resultsWithScores.map(({ score, ...product }) => product);

    // Limit results to 10 items for performance
    return NextResponse.json(results.slice(0, 10));
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
