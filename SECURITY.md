# Security

## Reporting

If you find a security issue, do not open a public issue with sensitive details.
Contact the repository owner privately and include:

- affected area,
- reproduction steps,
- impact,
- suggested fix if known.

## Secrets

Never commit:

- `.env` files,
- Supabase service role keys,
- Google API keys,
- SMTP credentials,
- generated builds,
- local logs or exports.

Use `.env.example` only for placeholder values.

## Current Status

This project is a student/portfolio web application. It is not audited for production use.
