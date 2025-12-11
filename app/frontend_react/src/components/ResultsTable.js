import React from 'react';
import './ResultsTable.css';

const ResultsTable = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="loading-message">
        <h3>🤖 正在智能分析简历，请稍候…</h3>
        <p>这可能需要一些时间，请耐心等待</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="no-results">
        <h3>📋 暂无筛选结果，请填写岗位信息并开始筛选。</h3>
        <p>填写岗位信息后，点击"开始筛选"按钮获取匹配结果</p>
      </div>
    );
  }

  return (
    <div className="results-table-container">
      <h2>候选人评分结果</h2>
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>人才编号</th>
              <th style={{ width: '80px' }}>得分</th>
              <th style={{ width: '100px' }}>经验年限</th>
              <th style={{ width: '200px' }}>核心技能</th>
              <th>评分理由</th>
              <th style={{ width: '120px' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => {
              // 提取需要显示的数据
              const resumeIndex = item.resume_index || index;
              const summaryScore = item.summary_score !== undefined ? item.summary_score.toFixed(2) : 'N/A';
              
              // 从report中提取经验年限和核心技能
              let yearsExperience = 'N/A';
              let coreSkills = 'N/A';
              let reasoning = '无评分理由';
              
              if (item.report) {
                // 提取经验年限
                if (item.plan && item.plan.normalized_resume) {
                  const resume = item.plan.normalized_resume;
                  if (resume.work_experiences && resume.work_experiences.length > 0) {
                    const totalYears = resume.work_experiences.reduce((sum, exp) => {
                      if (exp.years) {
                        return sum + parseFloat(exp.years);
                      }
                      return sum;
                    }, 0);
                    yearsExperience = `${totalYears.toFixed(1)}年`;
                  }
                }
                
                // 提取核心技能
                if (item.parsed_resume && item.parsed_resume.core_skills) {
                  coreSkills = Array.isArray(item.parsed_resume.core_skills) 
                    ? item.parsed_resume.core_skills.join(', ')
                    : item.parsed_resume.core_skills;
                }
                
                // 提取评分理由
                if (item.report.ordered_scores && item.report.ordered_scores.length > 0) {
                  reasoning = item.report.ordered_scores[0].reasoning || '无评分理由';
                }
              }
              
              // 处理特殊字符
              coreSkills = coreSkills.replace(/</g, '&lt;').replace(/>/g, '&gt;');
              reasoning = reasoning.replace(/</g, '&lt;').replace(/>/g, '&gt;');
              
              return (
                <tr key={resumeIndex}>
                  <td>{resumeIndex}</td>
                  <td>{summaryScore}</td>
                  <td>{yearsExperience}</td>
                  <td>{coreSkills}</td>
                  <td>{reasoning}</td>
                  <td>
                    <button className="action-btn" style={{ marginRight: '5px', padding: '2px 6px', fontSize: '12px' }}>查看详情</button>
                    <button className="action-btn" style={{ padding: '2px 6px', fontSize: '12px' }}>标记</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;