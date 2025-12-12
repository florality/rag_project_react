import React, { useState } from 'react';

const JobForm = ({ onSubmit, loading }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [topN, setTopN] = useState(4);

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
          placeholder="请输入岗位名称"
          className="form-control"
        />
      </div>
      
      <div className="slider-group">
        <label htmlFor="topN">返回候选人数量: {topN}</label>
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