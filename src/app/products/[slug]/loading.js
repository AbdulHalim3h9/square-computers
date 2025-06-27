export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Skeleton */}
          <div className="flex mb-6">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          
          {/* Product Grid Skeleton */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* Image Skeleton */}
              <div className="space-y-4">
                <div className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-200 rounded-md h-20 animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Info Skeleton */}
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                
                <div className="space-y-4 pt-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Specifications Skeleton */}
            <div className="border-t border-gray-200 px-6 py-8">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex">
                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 ml-4 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
