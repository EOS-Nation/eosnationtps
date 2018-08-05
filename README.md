# EOS Nation TPS (All Time High)

## 1. Create Custom Permissions

```bash
$ cleos set account permission "<ACCOUNT>" eosnationtps "<PUBLIC KEY>" active -p <ACCOUNT>@active
$ cleos set action permission "<ACCOUNT>" eosnationtps action eosnationtps
```

## 2. Push a transaction

```bash
$ cleos push action eosnationtps action '["Hello World"]' -p <ACCOUNT>@eosnationtps
```
