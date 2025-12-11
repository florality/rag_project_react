import React, { useState } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import ResultsTable from './components/ResultsTable';
import HelpTooltip from './components/HelpTooltip';
import { fetchScoreResults } from './services/api';

function App() {
  // 状态管理
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 处理表单提交
  const handleSubmit = async (jobData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('开始获取评分结果...');
      const data = await fetchScoreResults(
        jobData.jobTitle,
        jobData.requirements,
        jobData.topN
      );
      
      setResults(data);
      console.log(`成功获取到 ${data.length} 条结果`);
    } catch (err) {
      console.error('获取评分结果时出错:', err);
      setError(err.message || '获取评分结果失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* 标题区域 */}
      <header className="app-header">
        <h1 className="main-title">📄 智能简历筛选系统</h1>
        <p className="subtitle">输入岗位名称和要求，系统将自动为您筛选最匹配的候选人。</p>
      </header>
      
      {/* 主要内容区域 - 双栏布局 */}
      <main className="app-main">
        <div className="content-row">
          {/* 左侧：岗位信息区域 */}
          <div className="left-column">
            <div className="job-card">
              <h3 className="card-title">📋 岗位信息</h3>
              <JobForm onSubmit={handleSubmit} loading={loading} />
            </div>
          </div>
          
          {/* 右侧：详细岗位要求区域 */}
          <div className="right-column">
            <div className="requirements-card">
              <h3 className="card-title">📝 详细岗位要求</h3>
              <HelpTooltip />
            </div>
          </div>
        </div>
        
        {/* 底部：筛选结果表格区域 */}
        <div className="results-section">
          <h3 className="section-title">📊 筛选结果</h3>
          {error && (
            <div className="error-message">
              错误: {error}
            </div>
          )}
          <ResultsTable results={results} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default App;