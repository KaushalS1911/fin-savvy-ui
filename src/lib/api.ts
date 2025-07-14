import axios from 'axios';

const API_BASE_URL = 'https://finance-blogs-87niy.ondigitalocean.app/api';

export const testEndpoints = async () => {
  console.log('Testing API endpoints...');
  
  try {
    const blogsResponse = await axios.get(`${API_BASE_URL}/blogs`);

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
    } catch (error) {
    }
    
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/slug/${slug}`);
      return response.data;
    } catch (slugError) {

      const allBlogs = await getBlogs();
      const post = allBlogs.find((blog: any) => {
        if (blog.slug === slug) return true;
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
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 