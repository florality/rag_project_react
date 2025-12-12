import React, { useState } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import ResultsTable from './components/ResultsTable';
import { fetchScoreResults } from './services/api';

function App() {
  // 状态管理
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requirements, setRequirements] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showInterpretation, setShowInterpretation] = useState(false);

  // 处理表单提交
  const handleSubmit = async (jobData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('开始获取评分结果...');
      const data = await fetchScoreResults(
        jobData.jobTitle,
        requirements, // 使用独立的状态变量
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
      {/* 顶部：主标题+副标题 */}
      <header className="app-header">
        <h1 className="main-title">📄 智能简历筛选系统</h1>
        <p className="subtitle">输入岗位名称和要求，系统将自动为您筛选最匹配的候选人。</p>
      </header>
      
      {/* 中部：左右分栏布局 */}
      <main className="app-main">
        <div className="content-row">
          {/* 左侧操作区 */}
          <div className="left-column">
            <div className="job-card">
              <h3 className="card-title">📋 岗位信息</h3>
              <JobForm onSubmit={handleSubmit} loading={loading} />
            </div>
          </div>
          
          {/* 右侧内容区 */}
          <div className="right-column">
            <div className="requirements-card">
              <h3 className="card-title">
                📝 详细岗位要求
                <div className="help-icon" onMouseEnter={() => setShowInstructions(true)} onMouseLeave={() => setShowInstructions(false)}>?</div>
              </h3>
              {showInstructions && (
                <div className="tooltip instructions-tooltip">
                  <div className="tooltip-content">
                    <strong>使用说明</strong>
                    <ul>
                      <li>填写岗位名称和详细要求</li>
                      <li>设置需要返回的候选人数量</li>
                      <li>点击"开始筛选"按钮获取匹配结果</li>
                    </ul>
                  </div>
                </div>
              )}
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="请详细描述岗位要求，例如：
1. 专业技能要求
2. 工作经验要求
3. 学历要求
4. 其他特殊要求"
                className="requirements-textarea"
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* 底部：筛选结果区域 */}
      <div className="results-section">
        <div className="results-header">
          <h3 className="section-title">
            📊 筛选结果
            <div className="help-icon" onMouseEnter={() => setShowInterpretation(true)} onMouseLeave={() => setShowInterpretation(false)}>?</div>
          </h3>
          {showInterpretation && (
            <div className="tooltip interpretation-tooltip">
              <div className="tooltip-content">
                <strong>结果解读</strong>
                <ul>
                  <li><strong>人才编号:</strong> 候选人在人才库中的唯一标识符</li>
                  <li><strong>综合得分:</strong> 得分越高表示匹配度越高</li>
                  <li><strong>工作经验:</strong> 候选人的相关工作经验年限</li>
                  <li><strong>核心技能匹配:</strong> 候选人具备的核心技能</li>
                  <li><strong>评分理由:</strong> 系统生成的评估依据</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="error-message">
            错误: {error}
          </div>
        )}
        <ResultsTable results={results} loading={loading} />
      </div>
    </div>
  );
}

export default App;