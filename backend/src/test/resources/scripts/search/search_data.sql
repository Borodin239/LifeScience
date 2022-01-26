-- creates my own catalog
insert into category (id, creation_date, name)
values (6, parsedatetime('17-09-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'molecules');

insert into category (id, creation_date, name)
values (7, parsedatetime('17-10-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'proteins and peptides');
insert into category_sub_categories (parents_id, sub_categories_id)
values (6, 7);
insert into category (id, creation_date, name)
values (8, parsedatetime('17-11-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'nucleic acids');
insert into category_sub_categories (parents_id, sub_categories_id)
values (6, 8);

insert into category (id, creation_date, name)
values (9, parsedatetime('18-10-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'analysis');
insert into category_sub_categories (parents_id, sub_categories_id)
values (7, 9);
insert into category (id, creation_date, name)
values (10, parsedatetime('18-10-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'analysis');
insert into category_sub_categories (parents_id, sub_categories_id)
values (8, 10);

insert into category (id, creation_date, name)
values (11, parsedatetime('18-10-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'QUANTITATIVE ANALYSIS');
insert into category_sub_categories (parents_id, sub_categories_id)
values (9, 11);
insert into category (id, creation_date, name)
values (12, parsedatetime('18-10-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'QUANTITATIVE ANALYSIS');
insert into category_sub_categories (parents_id, sub_categories_id)
values (10, 12);
insert into category (id, creation_date, name)
values (13, parsedatetime('18-10-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'QUALITATIVE ANALYSIS');
insert into category_sub_categories (parents_id, sub_categories_id)
values (9, 13);
insert into category (id, creation_date, name)
values (14, parsedatetime('18-10-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 'QUALITATIVE ANALYSIS');
insert into category_sub_categories (parents_id, sub_categories_id)
values (10, 14);
-- nextCategoryId = 15
alter sequence category_seq restart with 15;

-- Protein and peptides
insert into public_approach (id, name, creation_date, owner_id)
values (2, 'SDS-PAGE', parsedatetime('17-12-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 1);
insert into category_approaches (categories_id, approaches_id)
values (13, 2);
insert into public_approach (id, name, creation_date, owner_id)
values (3, 'NATIVE PAGE', parsedatetime('17-12-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 1);
insert into category_approaches (categories_id, approaches_id)
values (13, 3);
insert into public_approach (id, name, creation_date, owner_id)
values (4, 'WESTERN BLOTTING', parsedatetime('17-12-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 1);
insert into category_approaches (categories_id, approaches_id)
values (13, 4);
insert into category_approaches (categories_id, approaches_id)
values (11, 4);
insert into public_approach (id, name, creation_date, owner_id)
values (5, 'ELISA', parsedatetime('17-12-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 1);
insert into category_approaches (categories_id, approaches_id)
values (13, 5);
insert into category_approaches (categories_id, approaches_id)
values (11, 5);
insert into public_approach (id, name, creation_date, owner_id)
values (6, 'BRADFORD', parsedatetime('17-12-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 1);
insert into category_approaches (categories_id, approaches_id)
values (11, 6);

-- Nucleic acids (12 and 14)
insert into public_approach (id, name, creation_date, owner_id)
values (7, 'SOUTHERN BLOTTING', parsedatetime('17-12-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 1);
insert into category_approaches (categories_id, approaches_id)
values (12, 7);
values (14, 7);
insert into public_approach (id, name, creation_date, owner_id)
values (8, 'QUANTITATIVE REAL TIME PCR', parsedatetime('17-12-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 1);
insert into category_approaches (categories_id, approaches_id)
values (12, 8);
values (14, 8);
insert into public_approach (id, name, creation_date, owner_id)
values (9, 'REAL-TIME PCR', parsedatetime('17-12-2020 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS'), 1);
insert into category_approaches (categories_id, approaches_id)
values (14, 9);

-- nextPublicApproachId = 6
alter sequence public_approach_seq restart with 14;