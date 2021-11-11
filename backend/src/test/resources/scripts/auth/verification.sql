insert into verification_token (id, expiry_date, lifetime_in_hours, token, credentials_id)
values (1, '2023-11-09 17:56:13.00', 24, 'token1', 4);
insert into verification_token (id, expiry_date, lifetime_in_hours, token, credentials_id)
values (2, '2020-11-09 17:56:13.00', 24, 'token2', 1);
alter sequence verification_token_seq restart with 3;