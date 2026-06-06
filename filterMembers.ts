import * as fs from 'fs';
import { mockMembers, Member } from './src/data/mockData';

const grouped: { [key: string]: number } = {};
const filteredMembers: Member[] = [];

mockMembers.forEach(member => {
    let industry = member.industry || member.company?.category || 'Other';
    if (!grouped[industry]) {
        grouped[industry] = 0;
    }
    if (grouped[industry] < 3) {
        filteredMembers.push(member);
        grouped[industry]++;
    }
});

let content = fs.readFileSync('./src/data/mockData.ts', 'utf-8');
const startTag = 'export const mockMembers: Member[] = [';
const startIdx = content.indexOf(startTag);
// find the ending ]; for mockMembers. 
// Since we know the line number was around 6763, we can just use substring to find the first ]; after startIdx
// But wait, there might be ]; inside the JSON (if any nested array is at the end of an object).
// So it's better to find `\n];` or `\r\n];`
let endIdx = content.indexOf('\n];', startIdx);
if (endIdx === -1) endIdx = content.indexOf('\r\n];', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const newArrayStr = JSON.stringify(filteredMembers, null, 2);
    const newContent = content.substring(0, startIdx) + 'export const mockMembers: Member[] = ' + newArrayStr + ';' + content.substring(endIdx + 3);
    fs.writeFileSync('./src/data/mockData.ts', newContent, 'utf-8');
    console.log(`Successfully filtered down to ${filteredMembers.length} members.`);
} else {
    console.log("Could not find bounds of mockMembers.");
}
