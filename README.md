### 1. Como rodar


```bash

pnpm install

```

**modo de desenvolvimento**

```bash

pnpm run dev

```

**build e start**

```bash
pnpm build && pnpm start

```

**rodar os testes**

```bash
pnpm run test

```

### 4. Endpoints disponíveis

1. GET /health

```bash
curl --location 'http://localhost:4000/health'

```

Result:

```json
{
  "success": true
}
```

2. POST /charges

```bash

curl --location 'http://localhost:4000/charges' \
--header 'Content-Type: application/json' \
--data '[
    {
        "chargeId": "c126",
        "partnerId": "net-02",
        "amount": 200,
        "reference": "2024-01",
        "timestamp": "2024-01-15T10:00:00Z"
    },
    {
        "chargeId": "c127",
        "partnerId": "net-02",
        "amount": 200,
        "reference": "2024-01",
        "timestamp": "2024-01-15T10:00:00Z"
    }
]'
```

Result:

```json
{
  "success": true
}
```

3. GET /invoices

```bash
curl --location 'http://localhost:4000/invoices'

```

Result:

```json
[
  {
    "partnerId": "net-02",
    "total": 400,
    "charges": [
      {
        "chargeId": "c126",
        "partnerId": "net-02",
        "amount": 200,
        "reference": "2024-01",
        "timestamp": "2024-01-15T10:00:00Z"
      },
      {
        "chargeId": "c127",
        "partnerId": "net-02",
        "amount": 200,
        "reference": "2024-01",
        "timestamp": "2024-01-15T10:00:00Z"
      }
    ]
  }
]
```

4. POST /clear-charges - Exclui charges e invoices da memória, usado para testes

```bash
curl --location --request POST 'http://localhost:4000/clear-charges' \
--data ''

```

Result:

```bash
{
    "success": true
}

```
