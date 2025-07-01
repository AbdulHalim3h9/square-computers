export const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Business Operations",
    slug: "future-ai-business-operations",
    excerpt: "How artificial intelligence is transforming business operations and what it means for the future of work.",
    content: `
      <p>Artificial Intelligence (AI) is no longer a futuristic concept but a present reality that's transforming how businesses operate. From automating routine tasks to providing deep insights through data analysis, AI is reshaping the business landscape.</p>
      <p>One of the most significant impacts of AI is in customer service. Chatbots and virtual assistants can now handle a large volume of customer inquiries, providing instant responses and freeing up human agents to handle more complex issues.</p>
      <p>In operations, AI-powered predictive maintenance can forecast equipment failures before they occur, reducing downtime and maintenance costs. Machine learning algorithms can also optimize supply chain management by predicting demand and identifying the most efficient delivery routes.</p>
      <p>As we move forward, businesses that embrace AI will gain a competitive edge through increased efficiency, better decision-making, and enhanced customer experiences.</p>
    `,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    date: "2023-06-15",
    author: "Sarah Johnson",
    category: "Technology"
  },
  {
    id: 2,
    title: "Cybersecurity Best Practices for Small Businesses",
    slug: "cybersecurity-best-practices",
    excerpt: "Essential cybersecurity measures every small business should implement to protect their digital assets.",
    content: `
      <p>In today's digital age, cybersecurity is not just a concern for large corporations. Small businesses are increasingly becoming targets of cyber attacks, making it crucial to implement strong security measures.</p>
      <p>Start with employee education. Many security breaches occur due to human error, so regular training on identifying phishing attempts and safe online practices is essential.</p>
      <p>Implement multi-factor authentication (MFA) for all business accounts. This adds an extra layer of security beyond just passwords.</p>
      <p>Regularly update all software and systems to patch vulnerabilities. Cybercriminals often exploit known vulnerabilities that could have been fixed with updates.</p>
      <p>Backup your data regularly and test your backups to ensure they can be restored in case of a ransomware attack or data loss.</p>
    `,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    date: "2023-06-10",
    author: "Michael Chen",
    category: "Security"
  },
  {
    id: 3,
    title: "The Rise of Remote Work: Tools and Strategies",
    slug: "remote-work-tools-strategies",
    excerpt: "Essential tools and effective strategies for managing remote teams in the new work environment.",
    content: `
      <p>The shift to remote work has become one of the most significant workplace transformations in recent years. As businesses adapt, having the right tools and strategies is crucial for success.</p>
      <p>Communication is key in remote work environments. Tools like Slack, Microsoft Teams, or Zoom help maintain team connectivity and collaboration.</p>
      <p>Project management tools like Asana, Trello, or Monday.com help keep teams organized and aligned on tasks and deadlines.</p>
      <p>Establishing clear expectations and regular check-ins can help maintain productivity and team cohesion in a remote setting.</p>
      <p>Remember to encourage work-life balance and mental health support as remote work can blur the lines between personal and professional life.</p>
    `,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    date: "2023-06-05",
    author: "Emily Rodriguez",
    category: "Workplace"
  }
];

export const getLatestBlogs = (count = 3) => {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count);
};

export const getBlogBySlug = (slug) => {
  return blogPosts.find(blog => blog.slug === slug);
};
