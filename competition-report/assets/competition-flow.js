(() => {
  async function showCaseRules() {
    const target = document.getElementById('case-rules');
    try {
      const response = await fetch('./prompt-data/competition-report-prompt-input.json', {cache:'no-store'});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const statistics = data.statistics_contract;
      if (!statistics) throw new Error('缺少統計契約');
      document.getElementById('statistics-scope').textContent = `${statistics.scope} ${statistics.validity}`;
      document.getElementById('statistics-grade').textContent = statistics.grade_distribution;
      document.getElementById('statistics-comparison').textContent = statistics.comparison;
      document.getElementById('statistics-empty').textContent = `${statistics.position} ${statistics.empty_state}`;
      const contract = data.case_selection_contract;
      if (!contract) throw new Error('缺少選例契約');
      document.getElementById('case-definition').textContent = contract.n_definition;
      document.getElementById('case-ranking').textContent = contract.ranking;
      for (const rule of contract.quantity_rules || []) {
        const item = document.createElement('div');
        item.className = 'case-rule';
        const label = document.createElement('strong');
        label.textContent = `${rule.condition}：`;
        item.append(label, document.createTextNode(rule.selection));
        target.append(item);
      }
    } catch (error) {
      document.getElementById('case-definition').textContent = `選例契約讀取失敗：${error.message}`;
    }
  }
  showCaseRules();
})();
