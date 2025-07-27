// src/lib/apiService.js

export async function fetchStores(params = {}) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/stores`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  const res = await fetch(url.toString());
  return res.json();
}

export async function fetchStoreById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${id}`);
  return res.json();
}

export async function createOrder(payload) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchOrderById(orderId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`);
  return res.json();
}
