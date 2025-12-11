import React, { useState } from 'react';

const JOB_TEMPLATES = {
  "": "请选择或输入自定义岗位...",
  "高级数据科学家": `要求:
1. 5年以上数据科学相关经验
2. 精通Python和机器学习库（如scikit-learn, TensorFlow, PyTorch）
3. 有深度学习项目经验，熟悉CNN、RNN等模型
4. 良好的沟通能力和团队协作精神
5. 熟悉大数据处理技术（如Spark, Hadoop）
6. 有团队管理经验者优先`,
  "产品经理": `要求:
1. 3年以上产品管理经验，有成功产品案例
2. 熟悉产品生命周期管理，能独立负责产品规划
3. 具备良好的市场洞察力和用户需求分析能力
4. 熟练使用Axure、Figma等原型设计工具
5. 具备优秀的沟通协调能力，能有效推动跨部门合作
6. 有互联网或科技行业背景优先`,
  "前端工程师": `要求:
1. 3年以上前端开发经验，精通Vue.js或React框架
2. 熟练掌握HTML5、CSS3、JavaScript(ES6+)
3. 有响应式设计和移动端开发经验
4. 熟悉Webpack等构建工具和npm生态系统
5. 了解前端性能优化和浏览器兼容性处理
6. 有良好的代码规范意识和团队协作能力`
};

const JobForm = ({ onSubmit, loading }) => {
  const [jobTitle, setJobTitle] = useState('高级数据科学家');
  const [requirements, setRequirements] = useState(JOB_TEMPLATES['高级数据科学家']);
  const [topN, setTopN] = useState(4); // 默认值改为4
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleTemplateChange = (e) => {
    const template = e.target.value;
    setSelectedTemplate(template);
    setRequirements(JOB_TEMPLATES[template] || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ jobTitle, requirements, topN });
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <div className="form-group">
        <label htmlFor="jobTitle">岗位名称</label>
        <input
          type="text"
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="例如：高级数据科学家"
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="templateDropdown">从常用岗位中选择</label>
        <select
          id="templateDropdown"
          value={selectedTemplate}
          onChange={handleTemplateChange}
          className="form-control"
        >
          {Object.keys(JOB_TEMPLATES).map((key) => (
            <option key={key} value={key}>
              {key || "请选择或输入自定义岗位..."}
            </option>
          ))}
        </select>
      </div>
      
      <div className="slider-group">
        <label htmlFor="topN">返回候选人数量</label>
        <div className="slider-container">
          <input
            type="range"
            id="topN"
            min="1"
            max="50"
            value={topN}
            onChange={(e) => setTopN(parseInt(e.target.value))}
            className="slider"
          />
          <input
            type="number"
            value={topN}
            onChange={(e) => setTopN(parseInt(e.target.value))}
            min="1"
            max="50"
            className="number-input"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className={`submit-btn ${loading ? 'loading' : ''}`}
      >
        {loading ? '🤖 正在智能分析简历，请稍候…' : '🚀 开始筛选'}
      </button>
    </form>
  );
};

export default JobForm;