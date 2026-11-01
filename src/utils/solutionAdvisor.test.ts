import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeHtmlText, detectCategory, parseSAPRssXml } from './sapParser.ts';
import { generateAdvisoryReport, INDUSTRY_PROFILES, SAP_RELEASE_MILESTONES } from './solutionAdvisor.ts';

test('sanitizeHtmlText removes tags, decodes entities, and trims whitespace', () => {
  const dirty = '<p>SAP announced <strong>Joule AI</strong> for &quot;Enterprise&quot;&nbsp;growth.</p>';
  const clean = sanitizeHtmlText(dirty);
  assert.equal(clean, 'SAP announced Joule AI for "Enterprise" growth.');
});

test('detectCategory accurately categorizes various SAP technology terms', () => {
  assert.equal(detectCategory('SAP Announces Joule Autonomous Copilot Capabilities'), 'joule-ai');
  assert.equal(detectCategory('New Release of SAP S/4HANA Cloud Public Edition 2026'), 's4hana-erp');
  assert.equal(detectCategory('Scaling Hybrid Scenarios with SAP BTP Integration Suite'), 'btp-cloud');
  assert.equal(detectCategory('Achieving Clean Core with ABAP Cloud and Migration from ECC 6.0'), 'clean-core');
  assert.equal(detectCategory('Predictive Logistics with SAP IBP Supply Chain Management'), 'supply-chain');
});

test('parseSAPRssXml parses sample RSS items cleanly into SAPNewsItem format', () => {
  const sampleXml = `
    <rss version="2.0">
      <channel>
        <title>SAP News Center</title>
        <link>https://news.sap.com</link>
        <item>
          <title><![CDATA[SAP Introduces Joule Studio for Business Process Transformation]]></title>
          <link>https://news.sap.com/2026/03/sap-joule-studio/</link>
          <pubDate>Mon, 10 Mar 2026 12:00:00 +0000</pubDate>
          <description><![CDATA[SAP today unveiled Joule Studio allowing developers to build custom agents.]]></description>
        </item>
      </channel>
    </rss>
  `;
  const items = parseSAPRssXml(sampleXml, 'SAP News Center');
  assert.equal(items.length, 1);
  assert.equal(items[0].title, 'SAP Introduces Joule Studio for Business Process Transformation');
  assert.equal(items[0].category, 'joule-ai');
  assert.equal(items[0].source, 'SAP News Center');
  assert.ok(items[0].executiveTakeawayVi.length > 10);
});

test('generateAdvisoryReport recommends GROW with SAP for SME without legacy ERP', () => {
  const report = generateAdvisoryReport({
    industry: 'retail-fmcg',
    currentSystem: 'Phần mềm kế toán nội địa Misa / Excel',
    companySize: 'sme',
    employeeCount: '150',
    annualRevenue: '120 tỷ VND',
    primaryGoals: ['Đồng bộ tồn kho đa kênh', 'Tự động hóa đối soát công nợ']
  });

  assert.equal(report.recommendedProgram, 'GROW with SAP');
  assert.equal(report.edition, 'SAP S/4HANA Cloud Public Edition');
  assert.ok(report.strategicFitScore >= 90);
  assert.equal(report.implementationPhases.length, 3);
  assert.ok(report.cleanCorePrinciples.length > 0);
  assert.ok(report.projectedROI.processEfficiency.includes('30%'));
});

test('generateAdvisoryReport recommends RISE with SAP for Large Enterprise or SAP ECC legacy users', () => {
  const report = generateAdvisoryReport({
    industry: 'manufacturing',
    currentSystem: 'SAP ECC 6.0 EHP 7 (On-premise)',
    companySize: 'large-enterprise',
    employeeCount: '2500',
    annualRevenue: '1,500 tỷ VND',
    primaryGoals: ['Chuyển đổi Clean Core', 'Đón đầu hạn chót 2027 ECC', 'Tối ưu MRP']
  });

  assert.equal(report.recommendedProgram, 'RISE with SAP');
  assert.equal(report.edition, 'SAP S/4HANA Cloud Private Edition');
  assert.ok(report.strategicFitScore >= 94);
  assert.ok(report.recommendedArchitecture.coreSystem.includes('Private Edition'));
});

test('SAP_RELEASE_MILESTONES includes ECC 6.0 2027 warning milestone', () => {
  const eccMilestone = SAP_RELEASE_MILESTONES.find(m => m.version.includes('ECC 6.0'));
  assert.ok(eccMilestone);
  assert.equal(eccMilestone?.status, 'End-of-Support Warning');
  assert.ok(eccMilestone?.eccDeadlineNotice?.includes('14 tháng'));
});
