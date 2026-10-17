import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const { marked } = await import(process.env.MARKED_MODULE || 'marked');
const guide = await fs.readFile(path.join(root, 'STUDY-GUIDE.md'), 'utf8');
const workbook = await fs.readFile(path.join(root, 'PRACTICE-WORKBOOK.md'), 'utf8');
const render = md => marked.parse(md, { gfm: true });
const notes = JSON.parse(await fs.readFile(path.join(root, 'learning-notes.json'), 'utf8'));
const checks = JSON.parse(await fs.readFile(path.join(root, 'learning-checks.json'), 'utf8'));
if (checks.length !== 16 || checks.some(c => !c.question || c.options.length !== 3 || !Number.isInteger(c.answer) || c.answer < 0 || c.answer > 2 || !c.explanation)) throw new Error('Every chapter needs a valid learning check');
const intro = guide.split(/^## 1\./m)[0];
const modules = [...guide.matchAll(/^## (\d+)\. (.+)\n([\s\S]*?)(?=^## \d+\.|$(?![\s\S]))/gm)].map(m => ({id:Number(m[1]),title:m[2],html:render(m[3]), ...notes.chapters[Number(m[1])-1], minutes:Math.max(2,Math.ceil(m[3].split(/\s+/).length/180))}));
if(notes.chapters.length!==16) throw new Error('Every chapter needs editorial notes');
if (modules.length !== 16) throw new Error('Expected all 16 guide sections');
const questions = [...workbook.matchAll(/^### (\d+)\. (.+)\n([\s\S]*?)(?=^### |^## |$(?![\s\S]))/gm)].map(m => {
  const split = m[3].search(/\*\*(?:Answer guidance|Worked answer):\*\*/);
  if (split < 0) throw new Error('Missing answer: '+m[1]);
  return {id:Number(m[1]), title:m[2], question:render(m[3].slice(0,split)), answer:render(m[3].slice(split))};
});
if (questions.length !== 15) throw new Error('Expected all 15 workbook problems');
const workbookExtras = workbook.slice(workbook.indexOf('## Part D:'));
const cards = [
 ['What makes an application agentic?', 'A model chooses some next actions dynamically, observes tool results, and adapts. The surrounding application executes and governs those actions.'],
 ['Does valid structured output mean a valid decision?', 'No. A schema constrains shape. The application still validates facts, business rules, ownership, authority, and current state.'],
 ['What verifies task completion?', 'Evidence from the authoritative environment checked against explicit success criteria. A model’s claim or an ended loop is not enough.'],
 ['When should you use a fixed workflow?', 'When the necessary control flow is known and can be encoded reliably. Add dynamic control when observations require flexible investigation.'],
 ['How do you isolate a retrieval problem?', 'Check whether retrieval finds the evidence you have marked as relevant. Then supply the correct evidence manually and test the answer stage. This separates missing evidence from incorrect interpretation.'],
 ['What is cost per verified success?', 'Total cost of all attempts, including failures, divided by verified successes. Include tools, compute, retries, and relevant human effort.'],
 ['What should you do after an uncertain write?', 'Check the actual operation status in the responsible service. If a retry is appropriate, reuse the same operation identifier when the service supports it. A new identifier may create a duplicate action.'],
 ['Why can agent voting fail?', 'Errors can be correlated. Workers may share the same wrong evidence, model weakness, or prompt. Agreement does not establish truth.'],
 ['Why does prompt injection need application controls?', 'Untrusted content may redirect the model. Permissions, tool scopes, secret access, and outbound network access must be enforced outside model-generated instructions.'],
 ['What is the difference between memory and fine-tuning?', 'Memory stores information the application can retrieve. Fine-tuning changes model parameters. Persistence alone is not parameter learning.'],
 ['How do pass@k and pass^k differ?', 'Define notation explicitly. At-least-one success measures candidate search; all-k success measures repeatability. Their independent-trial formulas are 1−(1−p)^k and p^k.'],
 ['What makes an architecture comparison fair?', 'Comparable tasks, environments, grading, versions, resource budgets, and latency objectives, with repeated trials and appropriate uncertainty estimates.']
];
const data = JSON.stringify({modules,questions,cards,checks,glossary:notes.glossary,guideMarkdown:guide,workbookMarkdown:workbook,intro:render(intro),workbookIntro:render(workbook.slice(0,workbook.indexOf('## Part A:'))),extras:render(workbookExtras)}).replaceAll('<','\\u003c');
const template = await fs.readFile(path.join(root,'study-template.html'),'utf8');
const app = await fs.readFile(path.join(root, 'app.js'), 'utf8');
const fallback = render(guide+'\n\n'+workbook);
const output = template.replace('/*__CONTENT__*/',()=>data).replace('/*__APP__*/',()=>app).replace('<!--__FALLBACK__-->',()=>fallback);
if(output.includes('—')) throw new Error('Em dash found in published content');
await fs.writeFile(path.join(root,'index.html'), output);
await fs.mkdir(path.join(root, 'github-pages'), {recursive:true});
await fs.writeFile(path.join(root, 'github-pages', 'index.html'), output);
await fs.writeFile(path.join(root, 'github-pages', '.nojekyll'), '');
console.log(`Built index.html with ${modules.length} chapters, ${questions.length} problems, and ${cards.length} review cards.`);
