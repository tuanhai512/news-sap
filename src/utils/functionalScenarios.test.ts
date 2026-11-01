import test from 'node:test';
import assert from 'node:assert/strict';
import { SAP_FUNCTIONAL_SCENARIOS } from './functionalData.ts';

test('SAP_FUNCTIONAL_SCENARIOS contains core functional modules (SD, MM, PP, FI-CO)', () => {
  const modules = SAP_FUNCTIONAL_SCENARIOS.map(s => s.module);
  assert.ok(modules.includes('SD'), 'Should contain SD module');
  assert.ok(modules.includes('MM'), 'Should contain MM module');
  assert.ok(modules.includes('PP'), 'Should contain PP module');
  assert.ok(modules.includes('FI-CO'), 'Should contain FI-CO module');
});

test('Every functional scenario has valid scope item code and non-empty steps', () => {
  for (const scenario of SAP_FUNCTIONAL_SCENARIOS) {
    assert.ok(scenario.scopeItemCode.length >= 3, `Scope item ${scenario.scopeItemCode} must be at least 3 chars`);
    assert.ok(scenario.steps.length >= 2, `Scenario ${scenario.id} should have at least 2 steps`);
    
    scenario.steps.forEach((step, idx) => {
      assert.equal(step.stepNumber, idx + 1, `Step numbering should be sequential`);
      assert.ok(step.fioriApp.length > 0, `Fiori app required for step ${step.stepName}`);
      assert.ok(step.tCode.length > 0, `T-Code required for step ${step.stepName}`);
      assert.ok(step.jouleAiAssistantRole.length > 0, `Joule AI role required for step ${step.stepName}`);
    });
  }
});

test('Accounting postings in SD O2C contain Debit and Credit pairs', () => {
  const sdScenario = SAP_FUNCTIONAL_SCENARIOS.find(s => s.id === 'sd-o2c-bd9');
  assert.ok(sdScenario);

  // Step 2 has PGI inventory vs COGS
  const pgiStep = sdScenario?.steps[1];
  assert.ok(pgiStep?.accountingPostings && pgiStep.accountingPostings.length === 2);
  const debitPgi = pgiStep?.accountingPostings?.find(p => p.debitCredit.includes('Debit'));
  const creditPgi = pgiStep?.accountingPostings?.find(p => p.debitCredit.includes('Credit'));
  assert.ok(debitPgi && creditPgi, 'PGI step must have Debit (COGS) and Credit (Inventory)');

  // Step 3 has Billing: AR debit, Revenue credit, VAT credit
  const billingStep = sdScenario?.steps[2];
  assert.ok(billingStep?.accountingPostings && billingStep.accountingPostings.length === 3);
});
