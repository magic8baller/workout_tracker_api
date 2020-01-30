
-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial NOT NULL,
	username varchar(30) NOT NULL,
	"password" varchar(1000) NOT NULL,
	email varchar(254) NULL,
	is_admin bool NOT NULL DEFAULT false,
	CONSTRAINT users_email_check CHECK (((email)::text <> ''::text)),
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_password_check CHECK (((password)::text <> ''::text)),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_username_check CHECK (((username)::text <> ''::text)),
	CONSTRAINT users_username_unique_constraint UNIQUE (username)
);