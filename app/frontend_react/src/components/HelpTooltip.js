import React, { useState } from 'react';
import './HelpTooltip.css';

const HelpTooltip = () => {
  const [activeTab, setActiveTab] = useState('instructions');

  return (
    <div className="help-tooltip">
      <div className="help-tabs">
        <button
          className={activeTab === 'instructions' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('instructions')}
        >
          📖 使用说明
        </button>
        <button
          className={activeTab === 'interpretation' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('interpretation')}
        >
          📈 结果解读
        </button>
      </div>

      <div className="help-content">
        {activeTab === 'instructions' ? (
          <div className="instructions-content">
            <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
              <strong>1. 填写岗位信息</strong>
              <ul>
                <li>输入岗位名称或从预设模板中选择</li>
                <li>设置需要返回的候选人数量</li>
              </ul>

              <strong>2. 编辑岗位要求</strong>
              <ul>
                <li>详细描述岗位技能要求</li>
                <li>列出工作职责和经验要求</li>
              </ul>

              <strong>3. 开始筛选</strong>
              <ul>
                <li>点击"开始筛选"按钮</li>
                <li>系统将智能分析并匹配候选人</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="interpretation-content">
            <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
              <strong>人才编号</strong>
              <ul>
                <li>候选人在人才库中的唯一标识符</li>
                <li>可用于后续联系和跟进</li>
              </ul>

              <strong>综合得分</strong>
              <ul>
                <li>得分越高表示匹配度越高</li>
                <li>基于大模型综合评估生成</li>
              </ul>

              <strong>工作经验</strong>
              <ul>
                <li>候选人的相关工作经验年限</li>
                <li>自动从简历中提取</li>
              </ul>

              <strong>核心技能匹配</strong>
              <ul>
                <li>候选人具备的核心技能</li>
                <li>重点展示与岗位相关的技能</li>
              </ul>

              <strong>评分理由</strong>
              <ul>
                <li>系统生成的评估依据</li>
                <li>解释候选人得分的具体原因</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpTooltip;