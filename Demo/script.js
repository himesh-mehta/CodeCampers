// ===== Mini Map =====
const miniMap = document.getElementById('miniMap');
const spotLabel = document.getElementById('spotLabel');
const gridRows = ['A','B','C'];
const gridCols = [1,2,3,4,5];
let currentSpot = 'B2';

function buildMiniMap() {
  miniMap.innerHTML = '';
  gridRows.forEach(r=>{
    gridCols.forEach(c=>{
      const cell = document.createElement('button');
      cell.className = 'aspect-square rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs';
      const name = `${r}${c}`;
      cell.textContent = name;
      cell.dataset.spot = name;
      cell.addEventListener('click', ()=>{
        currentSpot = name;
        spotLabel.textContent = `Grid: ${name}`;
        cell.classList.add('ring-2','ring-emerald-400');
        setTimeout(()=>cell.classList.remove('ring-2','ring-emerald-400'), 400);
      });
      miniMap.appendChild(cell);
    });
  });
}
buildMiniMap();

// ===== Tabs =====
const tabButtons = document.querySelectorAll('.tabBtn');
const panels = document.querySelectorAll('[id^="panel-"]');
tabButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    tabButtons.forEach(b=>b.classList.remove('tab-active'));
    panels.forEach(p=>p.classList.add('hidden'));
    btn.classList.add('tab-active');
    document.getElementById(`panel-${btn.dataset.tab}`).classList.remove('hidden');
  });
});

// ===== Analyze Field =====
document.getElementById('analyzeBtn').addEventListener('click', ()=>{
  document.getElementById('cardCrop').textContent = "Wheat";
  document.getElementById('cardConfidence').textContent = "Confidence: High";
  document.getElementById('cardWindow').textContent = "Nov - Dec";
  document.getElementById('cardIrr').textContent = "Moderate";
  document.getElementById('cardWeather').textContent = "Mostly Sunny";
  document.getElementById('cardPest').textContent = "Low risk";

  document.getElementById('recBody').innerHTML = `
    <ul class="list-disc list-inside text-slate-300 space-y-1">
      <li>Best suited for semi-arid climate.</li>
      <li>Apply irrigation every 10–12 days.</li>
      <li>Consider pest monitoring in flowering stage.</li>
    </ul>`;
});

// ===== Irrigation Calculator =====
document.getElementById('irrCalc').addEventListener('click', ()=>{
  const stage = document.getElementById('irrStage').value;
  const moist = document.getElementById('irrMoist').value;
  const size = parseFloat(document.getElementById('irrSize').value);

  let base = stage==="early" ? 3000 : stage==="mid" ? 5000 : 4000;
  if(moist==="low") base*=1.2;
  if(moist==="high") base*=0.8;

  const total = Math.round(base*size);
  document.getElementById('irrOut').textContent =
    `Estimated water needed: ${total.toLocaleString()} liters`;
});
