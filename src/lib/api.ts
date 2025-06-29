import axios from 'axios';

const API_BASE_URL = 'https://blog-be-gxxu.onrender.com/api';

// Test function to check available endpoints
export const testEndpoints = async () => {
  console.log('Testing API endpoints...');
  
  try {
    // Test blogs endpoint
    const blogsResponse = await axios.get(`${API_BASE_URL}/blogs`);
    console.log('✅ /blogs endpoint works:', blogsResponse.data.length, 'blogs found');
    
    if (blogsResponse.data.length > 0) {
      const firstBlog = blogsResponse.data[0];
      console.log('First blog:', {
        id: firstBlog._id,
        title: firstBlog.title,
        slug: firstBlog.slug || 'No slug field'
      });
      
      // Test individual blog by ID
      try {
        const blogByIdResponse = await axios.get(`${API_BASE_URL}/blogs/${firstBlog._id}`);
        console.log('✅ /blogs/:id endpoint works');
      } catch (error) {
        console.log('❌ /blogs/:id endpoint failed:', error.response?.status);
      }
      
      // Test slug endpoint if it exists
      if (firstBlog.slug) {
        try {
          const blogBySlugResponse = await axios.get(`${API_BASE_URL}/blogs/slug/${firstBlog.slug}`);
          console.log('✅ /blogs/slug/:slug endpoint works');
        } catch (error) {
          console.log('❌ /blogs/slug/:slug endpoint failed:', error.response?.status);
        }
      }
    }
    
    // Test categories endpoint
    try {
      const categoriesResponse = await axios.get(`${API_BASE_URL}/categories`);
      console.log('✅ /categories endpoint works:', categoriesResponse.data.length, 'categories found');
    } catch (error) {
      console.log('❌ /categories endpoint failed:', error.response?.status);
    }
    
  } catch (error) {
    console.error('❌ API base connection failed:', error.response?.status, error.message);
  }
};

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    // First try the slug endpoint
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/slug/${slug}`);
      console.log('Successfully fetched by slug:', slug);
      return response.data;
    } catch (slugError) {
      console.log('Slug endpoint failed, trying alternative approaches...');
      
      // If slug endpoint doesn't exist, try to find the post by title
      const allBlogs = await getBlogs();
      const post = allBlogs.find((blog: any) => {
        // Check if the blog has a slug field that matches
        if (blog.slug === slug) return true;
        
        // Generate slug from title and compare
        const titleSlug = blog.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        return titleSlug === slug;
      });
      
      if (post) {
        console.log('Found post by title slug:', post.title);
        return post;
      }
      
      throw new Error(`Blog post with slug "${slug}" not found`);
    }
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    throw error;
  }
};

export const getBlogById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}; 