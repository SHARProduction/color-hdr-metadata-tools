export const evaluators={
  'color-space-metadata-checker': i=>{const keys=['primaries','transfer','matrix','range'],rows=(i.files||[]).map(x=>({id:x.id,mismatches:keys.filter(k=>x[k]!==i.required?.[k])}));return{valid:rows.length>0&&rows.every(x=>!x.mismatches.length),rows}},
  'hdr-sdr-trim-pass-register': i=>{const rows=(i.masters||[]).map(x=>({...x,ready:Boolean(x.id&&x.sdrTrim&&x.approved&&x.evidence)}));return{valid:rows.length>0&&rows.every(x=>x.ready),rows,missing:rows.filter(x=>!x.ready).map(x=>x.id)}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
