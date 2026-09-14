export interface CTLogEntry {
  description: string;
  log_id: string;
  key: string;
  url?: string;
  submission_url?: string;
  monitoring_url?: string;
  mmd: number;
  state: {
    usable?: { timestamp: number };
    qualified?: { timestamp: number };
    readonly?: {
      timestamp: number;
      final_tree_head?: {
        sha256_root_hash: string;
        tree_size: number;
      };
    };
    retired?: { timestamp: number };
  };
  temporal_interval: {
    start_inclusive: number;
    end_exclusive: number;
  };
}

export interface CTOperator {
  name: string;
  email: string[];
  logs: CTLogEntry[];
  tiled_logs: CTLogEntry[];
}

export interface CTLogListResponse {
  version: string;
  log_list_timestamp: number;
  operators: CTOperator[];
}

export const CERTIFICATE_TRANSPARENCY_DATA: CTLogListResponse = {
  version: "89.30",
  log_list_timestamp: 1787664926000,
  operators: [
    {
      name: "Google",
      email: ["google-ct-logs@googlegroups.com"],
      logs: [
        {
          description: "Google 'Argon2026h2' log",
          log_id: "1219ENGn9XfCx+lf1wC/+YLJM1pl4dCzAXMXwMjFaXc=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEKjpni/66DIYrSlGK6Rf+e6F2c/28ZUvDJ79N81+gyimAESAyeNZ++TRgjHWg9TVQnKHTSU0T1TtqDupFnSQTIg==",
          url: "https://ct.googleapis.com/logs/us1/argon2026h2/",
          mmd: 86400,
          state: { usable: { timestamp: 1727734767000 } },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        },
        {
          description: "Google 'Argon2027h1'",
          log_id: "1tWNqdAXU/NqSqDHV0kCr+vH3CzTjNn3ZMgMiRkenwI=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEKHRm0H/zUaFA6Idz5cGvGO3tCPQyfGMgJmVBOPyKAP6mGM1IiNXi4CLomOUyYj0YN74p+eGVApFMsM4h/jzCsA==",
          url: "https://ct.googleapis.com/logs/us1/argon2027h1/",
          mmd: 86400,
          state: { usable: { timestamp: 1766881800000 } },
          temporal_interval: { start_inclusive: 1798761600000, end_exclusive: 1814400000000 }
        },
        {
          description: "Google 'Xenon2026h2' log",
          log_id: "2AlVO5RPev/IFhlvlE+Fq7D4/F6HVSYPFdEucrtFSxQ=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5Xd4lXEos5XJpcx6TOgyA5Z7/C4duaTbQ6C9aXL5Rbqaw+mW1XDnDX7JlRUninIwZYZDU9wRRBhJmCVopzwFvw==",
          url: "https://ct.googleapis.com/logs/eu1/xenon2026h2/",
          mmd: 86400,
          state: { usable: { timestamp: 1727734767000 } },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        },
        {
          description: "Google 'Xenon2027h1'",
          log_id: "RMK9DOkUDmSlyUoBkwpaobs1lw4A7hEWiWgqHETXtWY=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE/6WcA4VRSljIfTdY48+pFRLLtLrmTb88cGDdl8Gv3E2LduG4jgJ3AK5iNMFGhpbRRLi5B3rPlBaXVywuR5IFDg==",
          url: "https://ct.googleapis.com/logs/eu1/xenon2027h1/",
          mmd: 86400,
          state: { usable: { timestamp: 1766881800000 } },
          temporal_interval: { start_inclusive: 1798761600000, end_exclusive: 1814400000000 }
        }
      ],
      tiled_logs: [
        {
          description: "Google 'ParcelYard2026h2' log",
          log_id: "utuIpG+cr6QJDoLlk1bbbni0pT9YLbCBl5UkLym2jJg=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEP2H56bHx6pPm5mCku6PFpeRuA5Ux0gs8iwXIVhvVdbojs0pPwZqLtlIEoJNbjxMEePTYo/qDW85AjhMJITlavA==",
          submission_url: "https://parcelyard2026h2.prod.certificate.transparency.goog/",
          monitoring_url: "https://storage.googleapis.com/parcelyard2026h2.prod.certificate.transparency.goog/",
          mmd: 60,
          state: { qualified: { timestamp: 1781895600000 } },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        },
        {
          description: "Google 'ParcelYard2027h1' log",
          log_id: "HIl0B+YBCgEpO7Z439ejaM6xjMpSHcyk04bkoy5bXQQ=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEX7i7gYwmBxpiLXAlM/VLk4BFzspJRmZA86iReO7NVRlwGL1KWb/Dv5DRXJNBZd+9uREkNUTee5yBy2dRdRGa0w==",
          submission_url: "https://parcelyard2027h1.prod.certificate.transparency.goog/",
          monitoring_url: "https://storage.googleapis.com/parcelyard2027h1.prod.certificate.transparency.goog/",
          mmd: 60,
          state: { qualified: { timestamp: 1781895600000 } },
          temporal_interval: { start_inclusive: 1798761600000, end_exclusive: 1814400000000 }
        },
        {
          description: "Google 'PlumbersArms2026h2' log",
          log_id: "IPBfqqOkkvxqwUjMM6ICNhhrSfqpfmuzkk+yXsNrHDU=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAERcKG6mGyrCTtzkWBNT51LFFsM1lZ3ZPSIoXgVilDtnY0dyhwKSX7jomkXvdyqWr8DOP3HA6I6kzmREX5wpUvug==",
          submission_url: "https://plumbersarms2026h2.prod.certificate.transparency.goog/",
          monitoring_url: "https://storage.googleapis.com/plumbersarms2026h2.prod.certificate.transparency.goog/",
          mmd: 60,
          state: { qualified: { timestamp: 1781895600000 } },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        }
      ]
    },
    {
      name: "Cloudflare",
      email: ["ct-logs@cloudflare.com"],
      logs: [
        {
          description: "Cloudflare 'Nimbus2026'",
          log_id: "yzj3FYl8hKFEX1vB3fvJbvKaWc1HCmkFhbDLFMMUWOc=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE2FxhT6xq0iCATopC9gStS9SxHHmOKTLeaVNZ661488Aq8tARXQV+6+jB0983v5FkRm4OJxPqu29GJ1iG70Ahow==",
          url: "https://ct.cloudflare.com/logs/nimbus2026/",
          mmd: 86400,
          state: { usable: { timestamp: 1731088800000 } },
          temporal_interval: { start_inclusive: 1767225600000, end_exclusive: 1798761600000 }
        },
        {
          description: "Cloudflare 'Nimbus2027'",
          log_id: "TGPcmOWcHauI9h6KPd6uj6tEozd7X5uUw/uhnPzBviY=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEYjd/jE0EoAhNBbfcNhrTb7F0x10KZK8r2SDjx1GdjJ75hJrHx2OCQ+BXRjXi+czoREN1u0j9cWl8d6OoPMPogQ==",
          url: "https://ct.cloudflare.com/logs/nimbus2027/",
          mmd: 86400,
          state: { usable: { timestamp: 1763164800000 } },
          temporal_interval: { start_inclusive: 1798761600000, end_exclusive: 1830297600000 }
        }
      ],
      tiled_logs: []
    },
    {
      name: "DigiCert",
      email: ["ctops@digicert.com"],
      logs: [
        {
          description: "DigiCert 'Wyvern2026h2'",
          log_id: "wjF+V0UZo0XufzjespBB68fCIVoiv3/Vta12mtkOUs0=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEenPbSvLeT+zhFBu+pqk8IbhFEs16iCaRIFb1STLDdWzL6XwTdTWcbOzxMTzB3puME5K3rT0PoZyPSM50JxgjmQ==",
          url: "https://wyvern.ct.digicert.com/2026h2/",
          mmd: 86400,
          state: { usable: { timestamp: 1731024000000 } },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        },
        {
          description: "DigiCert 'Wyvern2027h1'",
          log_id: "ABpdGhwtk3W2SFV4+C9xoa5u7zl9KXyK4xV7yt7hoB4=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEastxYj1mntGuyv74k4f+yaIx+ZEzlSJ+iVTYWlw8SpSKJ4TfxYWuBhnETlhpyG/5seJn0mOSnVgXsZ1JRflI7g==",
          url: "https://wyvern.ct.digicert.com/2027h1/",
          mmd: 86400,
          state: { usable: { timestamp: 1766253600000 } },
          temporal_interval: { start_inclusive: 1798761600000, end_exclusive: 1814400000000 }
        },
        {
          description: "DigiCert 'Sphinx2026h2'",
          log_id: "lE5Dh/rswe+B8xkkJqgYZQHH0184AgE/cmd9VTcuGdg=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEquD0JkRQT/2inuaA4HC1sc6UpfiXgURVQmQcInmnZFnTiZMhZvsJgWAfYlU0OIykOC6slQzr7U9kvEVC9wZ6zQ==",
          url: "https://sphinx.ct.digicert.com/2026h2/",
          mmd: 86400,
          state: { usable: { timestamp: 1731024000000 } },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        }
      ],
      tiled_logs: []
    },
    {
      name: "Let's Encrypt",
      email: ["sre@letsencrypt.org"],
      logs: [
        {
          description: "Let's Encrypt 'Oak2026h2'",
          log_id: "rKswcGzr7IQx9BPS9JFfER5CJEOx8qaMTzwrO6ceAsM=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEanCds5bj7IU2lcNPnIvZfMnVkSmu69aH3AS8O/Y0D/bbCPdSqYjvuz9Z1tT29PxcqYxf+w1g5CwPFuwqsm3rFQ==",
          url: "https://oak.ct.letsencrypt.org/2026h2/",
          mmd: 86400,
          state: { retired: { timestamp: 1772236800000 } },
          temporal_interval: { start_inclusive: 1781913600000, end_exclusive: 1800403200000 }
        }
      ],
      tiled_logs: [
        {
          description: "Let's Encrypt 'Sycamore2026h2'",
          log_id: "bP5QGUOoXqkWvFLRM+TcyR7xQRx9JYQg0XOAnhgY6zo=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEwR1FtiiMbpvxR+sIeiZ5JSCIDIdTAPh7OrpdchcrCcyNVDvNUq358pqJx2qdyrOI+EjGxZ7UiPcN3bL3Q99FqA==",
          submission_url: "https://log.sycamore.ct.letsencrypt.org/2026h2/",
          monitoring_url: "https://mon.sycamore.ct.letsencrypt.org/2026h2/",
          mmd: 60,
          state: { usable: { timestamp: 1764212400000 } },
          temporal_interval: { start_inclusive: 1781740800000, end_exclusive: 1797465600000 }
        },
        {
          description: "Let's Encrypt 'Willow2026h2'",
          log_id: "qCbL4wrGNRJGUz/gZfFPGdluGQgTxB3ZbXkAsxI8VSc=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEp8wH8R6zfM+UhsQq5un+lPdNTDkzcgkWLi1DwyqU6T00mtP5/CuGjvpw4mIz89I6KV5ZvhRHt5ZTF6qe24pqiA==",
          submission_url: "https://log.willow.ct.letsencrypt.org/2026h2/",
          monitoring_url: "https://mon.willow.ct.letsencrypt.org/2026h2/",
          mmd: 60,
          state: { usable: { timestamp: 1764212400000 } },
          temporal_interval: { start_inclusive: 1781654400000, end_exclusive: 1797379200000 }
        }
      ]
    },
    {
      name: "Sectigo",
      email: ["ctops@sectigo.com"],
      logs: [
        {
          description: "Sectigo 'Mammoth2026h2'",
          log_id: "lLHBirDQV8R74KwEDh8svI3DdXJ7yVHyClJhJoY7pzw=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE7INh8te0u+TkO+vIY3WYz2GQYxQ9XyLfdLpQp1ibaX3mY4lt2ddRhD/4AtjI/8KXceV+J/VysY8kJ1cKDXTAtg==",
          url: "https://mammoth2026h2.ct.sectigo.com/",
          mmd: 86400,
          state: {
            readonly: {
              timestamp: 1758216000000,
              final_tree_head: {
                sha256_root_hash: "vJHecZC18lG3qp9lV2jZoi+7nkPHQx2SmM4VWglNsIk=",
                tree_size: 57634084
              }
            }
          },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        },
        {
          description: "Sectigo 'Tiger2026h2'",
          log_id: "yKPEf8ezrbk1awE/anoSbeM6TkOlxkb5l605dZkdz5o=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEfJFUD/FRkonvZIA9ZT1J3yvA4EpSp3innbIVpMTDR1oCe5vguapheQ7wYiWaCES1EL1B+2BEC+P5bUfwF44lnA==",
          url: "https://tiger2026h2.ct.sectigo.com/",
          mmd: 86400,
          state: { usable: { timestamp: 1758236400000 } },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        }
      ],
      tiled_logs: []
    },
    {
      name: "TrustAsia",
      email: ["trustasia-ct-logs@trustasia.com"],
      logs: [
        {
          description: "TrustAsia 'log2026a'",
          log_id: "dNudWPfUfp39eHoWKpkcGM9pjafHKZGMmhiwRQ26RLw=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEp056yaYH+f907JjLSeEAJLNZLoP9wHA1M0xjynSDwDxbU0B8MR81pF8P5O5PiRfoWy7FrAAFyXY3RZcDFf9gWQ==",
          url: "https://ct2026-a.trustasia.com/log2026a/",
          mmd: 86400,
          state: { usable: { timestamp: 1726790400000 } },
          temporal_interval: { start_inclusive: 1766534400000, end_exclusive: 1799366400000 }
        },
        {
          description: "TrustAsia 'HETU2027'",
          log_id: "7drrgVxjITRJtHvlB3kFq9DZMUfCesUUazvFjkPptsc=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE14jG8D9suqIVWPtTNOL33uXKZ4mUnnOMrIwOWeZU7GtoDRCWIXfy/9/SC8lTAbtP2NOP4wjIufAk6f64sY4DWg==",
          url: "https://hetu2027.trustasia.com/hetu2027/",
          mmd: 86400,
          state: { usable: { timestamp: 1766881800000 } },
          temporal_interval: { start_inclusive: 1798156800000, end_exclusive: 1830902400000 }
        }
      ],
      tiled_logs: []
    },
    {
      name: "IPng Networks",
      email: ["ct-ops@ipng.ch"],
      logs: [],
      tiled_logs: [
        {
          description: "IPng Networks 'Halloumi2026h2a'",
          log_id: "JuNkblhpISO8ND9HJDWbN5LNJFqI2BXTkzP9mRirRyM=",
          key: "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEiGh4zMsdukTgrdk9iPIwz9OfU9TQVi4Mxufpmnlrzv3ivJcxVhrST4XQSeQoF5LlFVIU6PL4IzrYl12BUWn9rQ==",
          submission_url: "https://halloumi2026h2a.log.ct.ipng.ch/",
          monitoring_url: "https://halloumi2026h2a.mon.ct.ipng.ch/",
          mmd: 60,
          state: { usable: { timestamp: 1767252600000 } },
          temporal_interval: { start_inclusive: 1782864000000, end_exclusive: 1798761600000 }
        }
      ]
    }
  ]
};
