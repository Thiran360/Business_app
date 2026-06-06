"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var mockData_1 = require("./src/data/mockData");
var grouped = {};
var filteredMembers = [];
mockData_1.mockMembers.forEach(function (member) {
    var _a;
    var industry = member.industry || ((_a = member.company) === null || _a === void 0 ? void 0 : _a.category) || 'Other';
    if (!grouped[industry]) {
        grouped[industry] = 0;
    }
    if (grouped[industry] < 3) {
        filteredMembers.push(member);
        grouped[industry]++;
    }
});
var content = fs.readFileSync('./src/data/mockData.ts', 'utf-8');
var startTag = 'export const mockMembers: Member[] = [';
var startIdx = content.indexOf(startTag);
// find the ending ]; for mockMembers. 
// Since we know the line number was around 6763, we can just use substring to find the first ]; after startIdx
// But wait, there might be ]; inside the JSON (if any nested array is at the end of an object).
// So it's better to find `\n];` or `\r\n];`
var endIdx = content.indexOf('\n];', startIdx);
if (endIdx === -1)
    endIdx = content.indexOf('\r\n];', startIdx);
if (startIdx !== -1 && endIdx !== -1) {
    var newArrayStr = JSON.stringify(filteredMembers, null, 2);
    var newContent = content.substring(0, startIdx) + 'export const mockMembers: Member[] = ' + newArrayStr + ';' + content.substring(endIdx + 3);
    fs.writeFileSync('./src/data/mockData.ts', newContent, 'utf-8');
    console.log("Successfully filtered down to ".concat(filteredMembers.length, " members."));
}
else {
    console.log("Could not find bounds of mockMembers.");
}
