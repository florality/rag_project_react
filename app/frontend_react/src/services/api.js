import axios from 'axios';

// 获取后端URL
const getBackendUrl = () => {
  // 首先检查环境变量
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // 在 Render 环境中，后端服务与前端在同一域名下
  // 但在开发环境中，我们需要指定后端端口
  if (process.env.NODE_ENV === 'development') {
    // 从 backend_port.txt 读取端口号，如果不存在则使用默认值 8065
    const port = 8065; // 我们知道实际端口是 8065
    return `http://localhost:${port}`;
  }
  
  // 在生产环境中，后端 API 位于同一域名的 /api 路径下
  // Render 会自动将 /api 路由到后端服务
  return '';
};

const BACKEND_URL = getBackendUrl();

// 调用后端API获取评分结果
export const fetchScoreResults = async (jobTitle, requirements, topN) => {
  try {
    // 准备请求数据
    const payload = {
      job_title: jobTitle,
      requirements: requirements,
      top_n: topN
    };

    // 构造完整的API URL
    const apiUrl = `${BACKEND_URL}/api/score`;

    console.log(`发送请求到后端: ${apiUrl}`);
    console.log(`请求数据:`, payload);

    // 发送POST请求到后端
    const response = await axios.post(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 300000 // 5分钟超时
    });

    console.log(`后端响应状态码: ${response.status}`);

    if (response.status === 200) {
      const data = response.data;
      
      // 后端返回的是{results: [...]}，需要兼容列表或字符串等异常格式
      let results = [];
      if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
          results = data;
        } else if (data.results && Array.isArray(data.results)) {
          results = data.results;
        }
      }

      console.log(`收到 ${results.length} 个评分结果`);
      return results;
    } else {
      throw new Error(`后端返回错误: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    if (error.response) {
      // 服务器响应了错误状态码
      throw new Error(`后端返回错误: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      // 请求已发出但没有收到响应
      throw new Error('无法连接到后端服务器，请检查网络连接和后端服务是否运行');
    } else {
      // 其他错误
      throw new Error(`调用后端时发生异常: ${error.message}`);
    }
  }
};

export default {
  fetchScoreResults
};