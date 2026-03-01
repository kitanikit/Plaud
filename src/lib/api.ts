export async function submitOrder(payload: any) {
  const res = await fetch("/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok || !data.ok) {
    throw new Error(data?.message || data?.error || "Ошибка оформления заказа");
  }

  return data;
}
