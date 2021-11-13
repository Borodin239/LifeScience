insert into users (id, first_name, last_name)
values (5, 'Expired', 'Expired');
alter sequence user_personal_data_seq restart with 6;
-- login=expired@gmail.ru, password=user123, role = user
insert into credentials (id, email, password, user_personal_data_id, enabled)
values (5, 'expired@gmail.ru', '$2a$10$deGk.zxpc23BWE7Upb89IOG1eELe3cK0RIA0h91aB/wjLFOkE/a8.', 5, false);
alter sequence credentials_seq restart with 6;

insert into verification_token (id, expiry_date, lifetime_in_hours, token, credentials_id)
values (1, '2023-11-09 17:56:13.00', 24, 'token1', 4);
insert into verification_token (id, expiry_date, lifetime_in_hours, token, credentials_id)
values (2, '2020-11-09 17:56:13.00', 24, 'token2', 1);
insert into verification_token (id, expiry_date, lifetime_in_hours, token, credentials_id)
values (3, '2020-11-09 17:56:13.00', 24, 'token3', 5);
alter sequence verification_token_seq restart with 4;