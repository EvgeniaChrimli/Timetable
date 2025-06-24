import { services } from "../constants/constants";
export function getServiceDuration(
  serviceId: number | null,
  categoryId: number | null
): number | null {
  const category = services.find((cat) => cat.id === categoryId);
  if (!category) return null;

  // Проверяем: простая ли категория
  const isSimple =
    Array.isArray(category.subcategories) && "id" in category.subcategories[0];

  if (isSimple) {
    // Простой список услуг
    const service = (category.subcategories as any[]).find(
      (s) => s.id === serviceId
    );
    return service?.duration ?? null;
  } else {
    // Сложная категория с вложенными подкатегориями
    for (const sub of category.subcategories as any[]) {
      const found = sub.services.find((s: any) => s.id === serviceId);
      if (found) return found.duration;
    }
  }

  return null;
}
