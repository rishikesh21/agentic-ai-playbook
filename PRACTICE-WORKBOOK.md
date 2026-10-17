# Agentic AI Practice Workbook

Companion exercises for the practical learning guide · 17 October 2026

Try each problem before reading its answer. Score yourself: 0 = needed the answer; 1 = correct explanation; 2 = correct implementation or experiment; 3 = demonstrated the result when something goes wrong. These are learning scores, not a percentile ranking.

All amounts, probabilities, timings, thresholds, policies, and experimental results below are invented teaching assumptions.

## Part A: Explain the mechanisms

### 1. Choose a system design

You receive 10,000 invoices daily. Every invoice must be parsed, checked against a purchase order, and sent for approval if the amount differs. Separately, an investigator must diagnose unfamiliar delivery failures using several systems.

Which architecture would you start with for each, and what evidence would justify changing it?

**Answer guidance:** start the invoice system with a fixed workflow: parse, validate, compare, route. Use deterministic arithmetic and approval rules. A dynamic investigation loop may suit the unfamiliar failure diagnosis because intermediate evidence determines subsequent actions. Compare with simpler baselines; measure resolution success, incorrect decisions, human effort, cost, and latency. Volume alone does not justify autonomy.

### 2. Correct data format, incorrect refund

Your model produces:

```json
{"order_id":"O-42","amount_minor_units":50000,"currency":"USD"}
```

The schema accepts it. The customer paid $50. What failed, and where should you fix it?

**Answer guidance:** the data format was correct, but the refund decision was not. Checking a schema does not check how much can be refunded or who may approve it. Validate ownership, paid amount, previous refunds, applicable policy, currency, and current order version in the application. The proposed $500 exceeds the assumed $50 payment. A prompt improvement can reduce bad proposals, but the commit boundary must still reject them.

### 3. The disappearing exception

A shortened conversation summary says “returns are permitted for 30 days.” The original policy says that opened custom products are excluded. The next agent approves a return of an opened custom product.

Design a better context and retrieval strategy.

**Answer guidance:** retain material exceptions and exact applicability conditions, store a reference to the complete versioned policy, retrieve it at decision time, and verify eligibility with authoritative facts. Include the relevant product classification and whether the item was opened. Test summaries for preserved constraints rather than rewarding brevity alone.

### 4. What counts as learning?

Classify each change: adding a failed case to a prompt; writing a verified preference to storage; indexing new policies; updating model weights from labeled examples; improving a policy through rewards.

**Answer guidance:** in-context prompting; persistent memory; retrieval/index update; supervised fine-tuning; reinforcement learning. All can change behavior, but their persistence, data requirements, and failure modes differ. Do not describe a model as parameter-trained merely because a surrounding application saved a note.

## Part B: Calculate the tradeoffs

### 5. Reliability compounds

A task needs 15 steps. Assume independent step success of 98%. Calculate full-task success. Now reduce it to eight necessary steps with the same step reliability.

**Worked answer:** 0.98¹⁵ ≈ 73.86%; 0.98⁸ ≈ 85.08%. Reducing unnecessary steps improves this hypothetical result. Independence and equal reliability are assumptions; real data may contain correlated failures and recovery. Do not use this calculation as a substitute for measuring actual end-to-end success.

### 6. Cheap attempts versus useful outcomes

System A costs $0.02 per attempt and succeeds on 60 of 100 attempts. B costs $0.035 and succeeds on 90. Every failure needs a $0.50 resolution by a person. Calculate cost per verified automated success and total cost including human resolution.

**Worked answer:** A costs $2/60 ≈ $0.0333 per automated success; B costs $3.50/90 ≈ $0.0389. Including human resolution: A = $2 + 40 × $0.50 = $22; B = $3.50 + 10 × $0.50 = $8.50. B is more expensive per automated success but cheaper under this service model. State the accounting assumptions whenever comparing systems.

### 7. The expensive fallback

A small configuration costs $0.01. A stronger one costs $0.08. You run the small one on every task and escalate 40% of tasks. Ignore router overhead. Compare expected model cost with always using the stronger configuration. At what escalation rate does the cascade stop saving model cost?

**Worked answer:** $0.01 + 0.40 × $0.08 = $0.042, versus $0.08. Break-even: $0.01 + r × $0.08 = $0.08, so r = 87.5%. Quality can differ: a router may fail to escalate incorrect answers. Add routing cost, latency, and undetected failures before choosing.

### 8. Parallel execution

Three independent read operations take 2, 4, and 6 seconds. A synthesis step takes 3 seconds. Coordination adds 1 second in the parallel version. Estimate serial and parallel latency. What changes if operation three depends on operation two?

**Worked answer:** serial = 2 + 4 + 6 + 3 = 15 seconds. Parallel = max(2,4,6) + 3 + 1 = 10 seconds. With the dependency, the critical read path is 4 + 6 = 10 seconds; the parallel estimate becomes 10 + 3 + 1 = 14 seconds. These ignore queueing and contention. Draw dependencies before promising speedups.

### 9. One successful attempt or consistent success?

Assume each independent attempt succeeds with probability 0.75. Calculate the probability of at least one success in four attempts and of four successful attempts in a row. Why might the first metric mislead?

**Worked answer:** at least one = 1 − 0.25⁴ = 99.609%; all four = 0.75⁴ = 31.641%. Candidate search needs a trustworthy way to identify the successful attempt. Real attempts may share errors. Repeated side-effecting attempts can also be unacceptable. An “at least one” result does not imply dependable first-try service.

### 10. Is a two-point gain meaningful?

A succeeds on 90 of 100 tasks; B succeeds on 92. You ran each once. Can you announce a clear improvement?

**Answer guidance:** insufficient evidence for a confident general claim. Inspect paired outcomes: which tasks changed and why? Repeat stochastic trials, use task-level uncertainty estimates, and evaluate a fresh holdout. For a single 90% success estimate on 100 independent tasks, the approximate standard error is 3 percentage points. A paired analysis can have different precision; separate clustered repeat trials from new tasks.

## Part C: Diagnose the failure

### 11. A timeout after a refund

The remote service accepts a refund. The response is lost. Your worker crashes before its local checkpoint. A new worker starts.

Write a recovery sequence and explain what the system must have persisted before the request.

**Answer guidance:** persist task identity, logical operation identity/idempotency key, intent, and validated proposal/version references. On recovery, query authoritative status or safely retry with the same supported idempotency key. Reconcile the receipt and local state. Do not create a new key merely because the worker restarted. If the service offers neither deduplication nor authoritative lookup, treat the result as ambiguous and escalate. Local state cannot create guarantees absent at the remote boundary.

### 12. The helpful malicious document

A retrieved policy contains valid return conditions and a footer instructing the agent to upload all orders to an external URL. The model proposes the upload.

Name the entry point, protected asset, trust boundary, enforcement point, and a useful test.

**Answer guidance:** entry point: retrieved document. Asset: customer/order data. Boundary: untrusted source text becoming an instruction to a privileged executor. Enforcement: tool authorization, scoped data access, limits on outbound network access, and approval rules outside the model. Test that the exact proposed upload is rejected; also test data leaks through URLs, search queries, and permitted lookup tools. Test legitimate requests too so a control that blocks everything does not appear successful.

### 13. The confident team

Five agents agree that a customer qualifies for a refund. All used the same obsolete policy. Why did voting fail? Design a stronger comparison.

**Answer guidance:** agreement did not provide independent evidence. Fix source version selection and applicability. Require provenance and conflict handling. Compare single-agent and multi-agent systems on the same tasks with equal total budget and appropriate latency constraints. Include a dataset where sources conflict. Measure synthesis errors and duplicated work, not just final accuracy.

### 14. Missing evidence or incorrect reasoning?

The agent answers 70% of policy questions correctly. How can you determine whether retrieval is the primary bottleneck?

**Answer guidance:** label required evidence and evaluate retrieval recall separately. Manually supply the correct evidence, sometimes called oracle evidence, and test the answer again. If accuracy rises sharply, investigate parsing, indexing, query construction, filtering, and reranking. If not, inspect interpretation, policy logic, context conflicts, and grading. Preserve access controls in oracle experiments; the oracle should supply only evidence the user could legitimately access.

### 15. A strong test score needs a fair comparison

A new paper reports a large score improvement using a critic agent, which checks another agent’s proposed work. The proposed system uses five times the inference budget. Your workload already uses a stronger base model.

Design a fair adoption experiment.

**Answer guidance:** identify the mechanism and targeted error class. Reproduce baseline and treatment with pinned task/environment configuration. Compare matched budgets as well as matched latency; include a stronger single attempt and selective verification. Measure critic false positives and false negatives, end-to-end success, cost, and task slices. Use a fresh holdout. Results may shrink if the targeted errors are rare in your stronger baseline. A useful outcome is a clear reason not to adopt.

## Part D: Three build challenges

### Build 1:  The honest read-only assistant

Create ten synthetic orders and versioned policy documents. Tools may read orders and retrieve policy. The assistant answers eligibility questions with evidence or asks for missing information.

Required adverse cases: unknown order, missing identity, irrelevant policy, obsolete policy, conflicting policy, inaccessible source, tool timeout, and malicious source instructions.

Deliver: contracts, bounded loop, 30 development cases, held-out cases, traces, and a failure taxonomy. Verify source support and authorization independently of answer style.

### Build 2:  The recoverable action workflow

Add draft and simulated commit operations, explicit authorization, a stable logical operation ID, and durable state. Introduce a fault hook before/after remote commit and before/after local checkpoint.

Deliver: a state-transition table, fault-injection results, and a demonstration that retries do not create a second logical refund. Include concurrent requests against the same refundable balance. State what your receiving service guarantees and which guarantees your implementation relies on.

### Build 3:  The optimization and research report

Compare a simple baseline, an improved single agent, and one more complex design. Choose one targeted mechanism: context compaction, model routing, tool discovery, verifier, or specialist delegation.

Deliver: declared hypothesis; fixed development set; fresh holdout; configuration manifest; equal-budget comparison; repeated trials; cost per success; latency percentiles; critical failure slices; limitations; and an adoption decision. Retain negative results. A clear failed hypothesis teaches more than a favorable but uncontrolled demo.

## Templates to copy

### One evaluation case

```yaml
task_id: return-017
scenario: opened custom product; current policy excludes it
starting_state: synthetic snapshot with explicit customer ownership
request: Can I return this item?
authorized_observations: order record and applicable policy snapshot
expected_outcome: explain exclusion with source; offer allowed escalation
forbidden_effects: refund commit or disclosure of another customer's data
faults: none
grading:
  state_checks: no refund recorded
  evidence_checks: cites applicable exclusion and correct version
  communication: accurate explanation without unsupported promises
split: development
```

Use a separate case for an injected timeout rather than silently altering this one. Store secrets nowhere in evaluation fixtures.

### Experiment record

```text
Question and predicted result:
Task set/version and split:
Environment and data snapshot:
Model identifier/configuration:
Prompt/tool/harness versions:
One changed factor:
Budget and stopping rules:
Number of tasks and trials per task:
Grader version and human calibration:
Verified success and uncertainty:
Critical failure slices:
Total cost, cost/success, p50/p95 latency:
Unexpected results:
Decision and limitations:
```

### Failure journal

```text
Task/run reference:
Observed symptom:
Expected outcome:
Initial hypothesis:
Evidence that supports or contradicts it:
Root cause, if established:
Fix and why it addresses the cause:
Regression case:
Residual uncertainty:
```

### Weekly learning record

```text
Week/topic:
What I can explain without notes:
What I built:
Failure I reproduced:
Experiment and measured result:
Claim I changed my mind about:
Evidence for this week's gate:
Next unresolved question:
```

## Oral defense: answer without slides

Allow five minutes per question. Use a concrete example and evidence from your project.

1. Which parts of your system should be deterministic, and why?
2. What is the strongest evidence that your agent succeeded?
3. How does your system recover from a write whose result is unknown?
4. What stops source text from becoming tool authority?
5. Which optimization improved the total service cost, and which merely shifted cost?
6. How do you distinguish retrieval failure, reasoning failure, and grading failure?
7. When did extra agents or extra inference make the system worse?
8. What would invalidate your evaluation conclusions?
9. What would you test before upgrading to a newly released model?
10. Where should a human still make the decision?

Have a reviewer choose a failure you have not rehearsed. Advanced competence shows in how you investigate it, not how confidently you present your prepared demo.
