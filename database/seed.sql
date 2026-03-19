-- Sample seed data for Thai-Swedish Healthcare Dictionary
-- Note: EF Core migrations and DataSeeder handle seeding automatically.
-- This file is for reference or manual seeding if needed.

-- Run migrations first: dotnet ef database update (from Api project)

-- Sources
INSERT INTO sources (id, name, url, description) VALUES
(1, 'Läkemedelsverket', 'https://www.lakemedelsverket.se', 'Swedish Medical Products Agency'),
(2, '1177 Vårdguiden', 'https://www.1177.se', 'Swedish healthcare guide'),
(3, 'Socialstyrelsen', 'https://www.socialstyrelsen.se', 'National Board of Health and Welfare')
;

-- Categories (main + sub)
INSERT INTO categories (id, name_th, name_sv, parent_id, sort_order) VALUES
(1, 'กายวิภาคศาสตร์', 'Anatomi', NULL, 1),
(2, 'โรค', 'Sjukdomar', NULL, 2),
(3, 'ยา', 'Läkemedel', NULL, 3),
(4, 'หัตถการ', 'Procedurer', NULL, 4),
(5, 'อาการ', 'Symtom', NULL, 5),
(6, 'อุปกรณ์ทางการแพทย์', 'Medicinsk utrustning', NULL, 6),
(7, 'ระบบหัวใจและหลอดเลือด', 'Kardiovaskulärt', 1, 1),
(8, 'ระบบทางเดินหายใจ', 'Respiratoriskt', 1, 2),
(9, 'ระบบย่อยอาหาร', 'Matspjälkningssystemet', 1, 3),
(10, 'ระบบกล้ามเนื้อและกระดูก', 'Muskuloskelettalt', 1, 4),
(11, 'ระบบประสาท', 'Nervsystemet', 1, 5)
;

-- Terms
INSERT INTO terms (swedish_word, thai_word, definition_th, category_id, context_example, source_id, created_at) VALUES
('hjärta', 'หัวใจ', 'อวัยวะที่ทำหน้าที่สูบฉีดเลือดไปทั่วร่างกาย', 7, 'Patienten har problem med hjärtat.', 1, NOW()),
('blodtryck', 'ความดันเลือด', 'แรงดันของเลือดที่กระทบผนังหลอดเลือด', 7, 'Blodtrycket är för högt.', 2, NOW()),
('luftrör', 'หลอดลม', 'ท่อที่นำอากาศจากคอไปยังปอด', 8, 'Luftröret är inflammerat.', 2, NOW()),
('feber', 'ไข้', 'อุณหภูมิร่างกายสูงกว่าปกติ', 5, 'Patienten har feber.', 2, NOW()),
('smärta', 'ความเจ็บปวด', 'ความรู้สึกไม่สบายหรือเจ็บ', 5, 'Patienten känner smärta i bröstet.', 2, NOW()),
('tablett', 'ยาเม็ด', 'รูปแบบยาที่เป็นเม็ดแข็ง', 3, 'Ta en tablett tre gånger om dagen.', 1, NOW()),
('injektion', 'การฉีดยา', 'การให้ยาผ่านเข็มฉีดเข้าเส้นเลือดหรือกล้ามเนื้อ', 4, 'Patienten behöver en injektion.', 3, NOW()),
('stetoskop', 'หูฟังตรวจ', 'เครื่องมือใช้ฟังเสียงหัวใจและปอด', 6, 'Läkaren använder stetoskopet.', 3, NOW());
