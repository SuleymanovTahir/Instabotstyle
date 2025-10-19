from fastapi import FastAPI, Request, Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Models (unchanged from original)
class Client(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    instagram: str
    visits: int
    ltv: float
    lastVisit: str
    status: str

class Booking(BaseModel):
    id: int
    client: str
    service: str
    date: str
    time: str
    phone: str
    status: str
    created: str
    amount: float

class User(BaseModel):
    id: int
    name: str
    surname: str
    username: str
    email: str
    role: str
    status: str
    createdAt: str

class Service(BaseModel):
    id: int
    key: str
    name: str
    nameRu: str
    price: float
    currency: str
    category: str
    description: str
    descriptionRu: str
    benefits: list[str]
    active: bool

# Mock data (unchanged from original, extended where needed for new sections)
mock_clients = [
    Client(id=1, name="Анна Иванова", phone="+971 50 123 4567", email="anna@example.com", instagram="@anna_ivanova", visits=12, ltv=4800, lastVisit="2025-10-15", status="vip"),
    Client(id=2, name="Мария Петрова", phone="+971 50 234 5678", email="maria@example.com", instagram="@maria_p", visits=6, ltv=2100, lastVisit="2025-10-18", status="regular"),
    Client(id=3, name="Елена Сидорова", phone="+971 50 345 6789", email="elena@example.com", instagram="@elena_sid", visits=3, ltv=1200, lastVisit="2025-10-19", status="new"),
]

mock_bookings = [
    Booking(id=1, client="Анна Иванова", service="Перманентный макияж бровей", date="2025-10-20", time="10:00", phone="+971 50 123 4567", status="pending", created="2025-10-19 14:30", amount=800),
    Booking(id=2, client="Мария Петрова", service="Маникюр + педикюр", date="2025-10-20", time="12:00", phone="+971 50 234 5678", status="confirmed", created="2025-10-18 09:15", amount=350),
    Booking(id=3, client="Елена Сидорова", service="Массаж лица", date="2025-10-19", time="15:00", phone="+971 50 345 6789", status="completed", created="2025-10-17 11:20", amount=450),
    Booking(id=4, client="Ольга Николаева", service="Наращивание ресниц", date="2025-10-20", time="14:00", phone="+971 50 456 7890", status="pending", created="2025-10-19 16:45", amount=500),
    Booking(id=5, client="София Козлова", service="Стрижка и укладка", date="2025-10-18", time="11:00", phone="+971 50 567 8901", status="cancelled", created="2025-10-15 13:00", amount=300),
]

mock_booking_detail = {
    "id": 1,
    "service": "Перманентный макияж бровей",
    "date": "20.10.2025",
    "time": "10:00",
    "status": "pending",
    "amount": 800,
    "created": "19.10.2025 14:30",
    "client": {
        "id": 1,
        "name": "Анна Иванова",
        "phone": "+971 50 123 4567",
        "email": "anna.ivanova@email.com",
        "instagram": "@anna_ivanova",
        "messages": 12,
        "ltv": 2400,
        "lastContact": "19.10.2025"
    },
    "notes": "Клиент просил подтвердить за день до процедуры"
}

mock_users = [
    User(id=1, name="Анна", surname="Петрова", username="anna_petrova", email="anna@luxurybeauty.ae", role="admin", status="active", createdAt="2025-01-15"),
    User(id=2, name="Мария", surname="Иванова", username="maria_ivanova", email="maria@luxurybeauty.ae", role="employee", status="active", createdAt="2025-02-20"),
    User(id=3, name="Елена", surname="Сидорова", username="elena_sidorova", email="elena@luxurybeauty.ae", role="manager", status="active", createdAt="2025-03-10"),
]

mock_services = [
    Service(id=1, key='permanent_makeup_brows', name='Permanent Makeup - Brows', nameRu='Перманентный макияж бровей', price=800, currency='AED', category='Permanent Makeup', description='Professional brow tattooing', descriptionRu='Профессиональный татуаж бровей', benefits=['Long-lasting', 'Natural look', 'Waterproof'], active=True),
    Service(id=2, key='manicure_pedicure', name='Manicure + Pedicure', nameRu='Маникюр + Педикюр', price=350, currency='AED', category='Nails', description='Complete nail care', descriptionRu='Полный уход за ногтями', benefits=['Gel polish', 'Hand massage', 'Foot spa'], active=True),
    Service(id=3, key='facial_massage', name='Facial Massage', nameRu='Массаж лица', price=450, currency='AED', category='Facial', description='Relaxing facial treatment', descriptionRu='Расслабляющий массаж лица', benefits=['Anti-aging', 'Lymphatic drainage', 'Glowing skin'], active=True),
]

mock_analytics = {
    "bookings_trend_data": [
        {"name": "Пн", "записи": 12},
        {"name": "Вт", "записи": 19},
        {"name": "Ср", "записи": 15},
        {"name": "Чт", "записи": 22},
        {"name": "Пт", "записи": 28},
        {"name": "Сб", "записи": 35},
        {"name": "Вс", "записи": 30},
    ],
    "services_data": [
        {"name": "Перманентный макияж", "value": 35, "color": "#ec4899"},
        {"name": "Маникюр", "value": 25, "color": "#8b5cf6"},
        {"name": "Массаж", "value": 20, "color": "#06b6d4"},
        {"name": "Наращивание ресниц", "value": 12, "color": "#f59e0b"},
        {"name": "Стрижка", "value": 8, "color": "#10b981"},
    ],
    "status_data": [
        {"name": "Ожидает", "записи": 15},
        {"name": "Подтверждена", "записи": 28},
        {"name": "Завершена", "записи": 42},
        {"name": "Отменена", "записи": 8},
    ],
    "revenue_data": [
        {"name": "Неделя 1", "доход": 12500},
        {"name": "Неделя 2", "доход": 15200},
        {"name": "Неделя 3", "доход": 14800},
        {"name": "Неделя 4", "доход": 18300},
    ],
    "top_services": [
        {"name": "Перманентный макияж бровей", "count": 45, "revenue": 36000},
        {"name": "Маникюр + педикюр", "count": 38, "revenue": 13300},
        {"name": "Массаж лица", "count": 32, "revenue": 14400},
        {"name": "Наращивание ресниц", "count": 28, "revenue": 14000},
        {"name": "Окрашивание волос", "count": 24, "revenue": 12000},
    ],
}

mock_dashboard = {
    "stats": [
        {"icon": "Calendar", "label": "Записи сегодня", "value": "24", "color": "text-pink-600", "bg": "bg-pink-50"},
        {"icon": "Users", "label": "Новые клиенты", "value": "8", "color": "text-purple-600", "bg": "bg-purple-50"},
        {"icon": "DollarSign", "label": "Доход за день", "value": "12,400 AED", "color": "text-green-600", "bg": "bg-green-50"},
        {"icon": "TrendingUp", "label": "Рост продаж", "value": "+15.3%", "color": "text-blue-600", "bg": "bg-blue-50"},
    ],
    "recent_bookings": [
        {"id": 1, "client": "Анна Иванова", "service": "Перманентный макияж", "time": "10:00", "status": "pending"},
        {"id": 2, "client": "Мария Петрова", "service": "Маникюр", "time": "12:00", "status": "confirmed"},
        {"id": 3, "client": "Елена Сидорова", "service": "Массаж лица", "time": "14:00", "status": "completed"},
    ],
}

mock_settings = {
    "general_settings": {
        "salonName": "Luxury Beauty Salon",
        "city": "Dubai",
        "address": "Dubai Marina, Marina Plaza, Office 2301",
        "phone": "+971 50 123 4567",
    },
    "bot_settings": {
        "botToken": "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "welcomeMessage": "Добро пожаловать в Luxury Beauty Salon!",
        "language": "ru",
    },
    "notification_settings": {
        "bookingConfirmation": True,
        "bookingReminder": True,
        "reminderHours": 24,
        "clientNotifications": True,
        "bookingNotifications": True,
        "marketingEmails": True,
        "birthdayReminders": True,
        "birthdayDaysAdvance": 7,
    },
}

# Extended mock data for new sections (Manager, Employee, Public)
mock_messages = [
    {
        "id": 1,
        "from": "Анна Иванова",
        "avatar": "АИ",
        "time": "2025-10-18 14:30",
        "subject": "Вопрос о записи",
        "preview": "Здравствуйте, можно записаться на маникюр?",
        "unread": True,
        "starred": False,
        "status": "new",
        "category": "appointments"
    },
    {
        "id": 2,
        "from": "Мария Петрова",
        "avatar": "МП",
        "time": "2025-10-18 12:15",
        "subject": "Подтверждение записи",
        "preview": "Подтверждаю запись на завтра в 15:00",
        "unread": False,
        "starred": True,
        "status": "replied",
        "category": "appointments"
    },
    {
        "id": 3,
        "from": "Елена Смирнова",
        "avatar": "ЕС",
        "time": "2025-10-17 09:00",
        "subject": "Отмена записи",
        "preview": "Прошу отменить запись на среду",
        "unread": False,
        "starred": False,
        "status": "in_progress",
        "category": "questions"
    }
]

mock_chat = {
    "client": {"name": "Анна Иванова", "avatar": "/static/images/avatar1.jpg"},
    "messages": [
        {"sender": "client", "text": "Здравствуйте!", "time": "14:30"},
        {"sender": "manager", "text": "Добрый день! Чем могу помочь?", "time": "14:32"},
    ]
}

mock_funnel = {
    "stages": [
        {"name": "Посетители", "description": "Первичные посетители сайта/соцсетей", "count": 1500, "rate": 100, "color": "bg-blue-500", "losses": 0},
        {"name": "Вовлечённые", "description": "Проявили интерес (лайк, комментарий, просмотр)", "count": 850, "rate": 56.7, "color": "bg-cyan-500", "losses": 650},
        {"name": "Начали запись", "description": "Открыли форму записи", "count": 420, "rate": 49.4, "color": "bg-green-500", "losses": 430},
        {"name": "Записались", "description": "Завершили бронирование", "count": 280, "rate": 66.7, "color": "bg-amber-500", "losses": 140},
        {"name": "Посетили", "description": "Пришли на процедуру", "count": 245, "rate": 87.5, "color": "bg-pink-500", "losses": 35},
    ],
    "conversionMetrics": [
        {"label": "Посетитель → Вовлечённый", "value": "56.7%", "status": "good"},
        {"label": "Вовлечённый → Начал запись", "value": "49.4%", "status": "medium"},
        {"label": "Начал запись → Записался", "value": "66.7%", "status": "good"},
        {"label": "Записался → Посетил", "value": "87.5%", "status": "excellent"},
    ],
    "recommendations": [
        {"title": "Увеличить вовлечённость", "description": "Потеря 650 потенциальных клиентов на этапе вовлечения", "suggestion": "Улучшите контент в соцсетях, добавьте отзывы и примеры работ", "priority": "high"},
        {"title": "Оптимизировать форму записи", "description": "Потеря 430 пользователей после открытия формы", "suggestion": "Упростите форму, добавьте автозаполнение и подсказки", "priority": "medium"},
        {"title": "Сократить потери на этапе посещения", "description": "35 отмен или неявок", "suggestion": "Внедрите напоминания за 24 часа и подтверждение за день до", "priority": "low"},
    ],
    "stageDetails": [
        {"stage": "Посетители", "count": 1500, "conversion": "100%", "losses": 0, "status": "excellent"},
        {"stage": "Вовлечённые", "count": 850, "conversion": "56.7%", "losses": 650, "status": "medium"},
        {"stage": "Начали запись", "count": 420, "conversion": "49.4%", "losses": 430, "status": "medium"},
        {"stage": "Записались", "count": 280, "conversion": "66.7%", "losses": 140, "status": "good"},
        {"stage": "Посетили", "count": 245, "conversion": "87.5%", "losses": 35, "status": "excellent"},
    ]
}

mock_employee_profile = {
    "name": "Мария Иванова",
    "role": "Мастер маникюра",
    "email": "maria@luxurybeauty.ae",
    "phone": "+971 50 234 5678",
    "experience": "5 лет",
    "specialties": ["Маникюр", "Педикюр", "Наращивание ногтей"]
}

mock_public = {
    "home": {
        "hero": "Добро пожаловать в Luxury Beauty Salon",
        "services": mock_services[:3],
    },
    "price_list": mock_services,
    "about": "Мы - премиальный салон красоты в Дубае.",
    "contacts": {
        "phone": "+971 50 123 4567",
        "email": "info@luxurybeauty.ae",
        "address": "Dubai Marina, Marina Plaza, Office 2301",
    },
    "faq": [
        {"question": "Как записаться?", "answer": "Через сайт или по телефону."},
        {"question": "Сколько стоит услуга?", "answer": "Смотрите прайс-лист."},
    ],
    "team": [
        {"name": "Анна Петрова", "role": "Мастер перманентного макияжа", "experience": "8 лет опыта", "avatar": "А"},
        {"name": "Мария Иванова", "role": "Косметолог", "experience": "6 лет опыта", "avatar": "М"},
        {"name": "Елена Сидорова", "role": "Мастер маникюра", "experience": "5 лет опыта", "avatar": "Е"},
        {"name": "Ольга Козлова", "role": "Парикмахер-стилист", "experience": "10 лет опыта", "avatar": "О"},
        {"name": "София Николаева", "role": "Lash-мастер", "experience": "4 года опыта", "avatar": "С"},
        {"name": "Ирина Волкова", "role": "Массажист", "experience": "7 лет опыта", "avatar": "И"},
    ],
    "faqs": [
        {"question": "Как записаться на процедуру?", "answer": "Вы можете записаться на процедуру через форму на нашем сайте, позвонив по телефону +971 50 123 4567, или написав нам в Instagram @luxurybeauty_dubai. Мы свяжемся с вами для подтверждения записи."},
        {"question": "Какие способы оплаты вы принимаете?", "answer": "Мы принимаем оплату наличными и картами (Visa, MasterCard, American Express). Оплата производится после оказания услуги."},
        {"question": "Могу ли я отменить или перенести запись?", "answer": "Да, вы можете отменить или перенести запись не позднее чем за 24 часа до назначенного времени. При отмене менее чем за 24 часа может взиматься штраф в размере 50% от стоимости услуги."},
        {"question": "Сколько времени занимает процедура перманентного макияжа?", "answer": "Время зависит от зоны: брови - 2-3 часа, губы - 2-2.5 часа, межресничка - 1.5-2 часа. Это включает консультацию, эскиз и саму процедуру."},
        {"question": "Какие материалы вы используете?", "answer": "Мы используем только сертифицированные премиальные материалы от ведущих мировых брендов. Все пигменты гипоаллергенны и безопасны для здоровья."},
        {"question": "Есть ли у ваших мастеров сертификаты?", "answer": "Да, все наши мастера имеют международные сертификаты и регулярно проходят курсы повышения квалификации. Мы можем предоставить копии сертификатов по запросу."},
        {"question": "Нужна ли подготовка перед процедурой?", "answer": "Да, для некоторых процедур требуется подготовка. Например, перед перманентным макияжем рекомендуется избегать алкоголя и кофе за 24 часа. Подробные инструкции вы получите при записи."},
    ],
    "services": [
        'Перманентный макияж бровей',
        'Маникюр',
        'Педикюр',
        'Массаж лица',
        'Наращивание ресниц',
        'Стрижка и укладка',
        'Окрашивание волос',
        'Чистка лица'
    ],
    "testimonials": [
        {"name": "Анна Иванова", "rating": 5, "text": "Невероятный сервис! Мастера профессионалы своего дела. Результатом перманентного макияжа очень довольна!", "avatar": "А"},
        {"name": "Мария Петрова", "rating": 5, "text": "Лучший салон в городе! Всегда чисто, уютно и внимательный персонал. Хожу сюда уже 2 года.", "avatar": "М"},
        {"name": "Елена Сидорова", "rating": 5, "text": "Прекрасный массаж лица! Ощущение релакса и свежести после процедуры. Однозначно рекомендую!", "avatar": "Е"}
    ]
}

categories = [
    {"value": "all", "label": "Все"},
    {"value": "appointments", "label": "Записи"},
    {"value": "questions", "label": "Вопросы"},
    {"value": "complaints", "label": "Жалобы"}
]

statuses = [
    {"value": "all", "label": "Все"},
    {"value": "new", "label": "Новые"},
    {"value": "in_progress", "label": "В работе"},
    {"value": "replied", "label": "Отвеченные"}
]

# Existing Admin Routes (unchanged, but adapted for consistency)
@app.get("/admin/dashboard")
async def admin_dashboard(request: Request):
    return templates.TemplateResponse(
        "admin/dashboard.html",
        {
            "request": request,
            "stats": mock_dashboard["stats"],
            "recent_bookings": mock_dashboard["recent_bookings"],
            "user": {"name": "Администратор", "role": "admin"}
        }
    )

@app.get("/admin/analytics")
async def admin_analytics(request: Request):
    return templates.TemplateResponse(
        "admin/analytics.html",
        {
            "request": request,
            "bookings_trend_data": mock_analytics["bookings_trend_data"],
            "services_data": mock_analytics["services_data"],
            "status_data": mock_analytics["status_data"],
            "revenue_data": mock_analytics["revenue_data"],
            "top_services": mock_analytics["top_services"],
            "user": {"name": "Администратор", "role": "admin"}
        }
    )

@app.get("/admin/clients")
async def admin_clients(request: Request, search: Optional[str] = ""):
    filtered_clients = [
        client for client in mock_clients
        if (search.lower() in client.name.lower() or
            search in client.phone or
            search.lower() in client.email.lower())
    ]
    return templates.TemplateResponse(
        "admin/clients.html",
        {
            "request": request,
            "clients": filtered_clients,
            "search_term": search,
            "user": {"name": "Администратор", "role": "admin"}
        }
    )


conversion_metrics = [
    {"label": "Посетитель → Вовлечённый", "value": "56.7%", "status": "good"},
    {"label": "Вовлечённый → Начал запись", "value": "49.4%", "status": "medium"},
    {"label": "Начал запись → Записался", "value": "66.7%", "status": "good"},
    {"label": "Записался → Посетил", "value": "87.5%", "status": "excellent"},
]

recommendations = [
    {
        "title": "Увеличить вовлечённость",
        "description": "Потеря 650 потенциальных клиентов на этапе вовлечения",
        "suggestion": "Улучшите контент в соцсетях, добавьте отзывы и примеры работ",
        "priority": "high"
    },
    {
        "title": "Оптимизировать форму записи",
        "description": "51% посетителей уходят не завершив запись",
        "suggestion": "Упростите форму записи, добавьте автозаполнение",
        "priority": "high"
    },
    {
        "title": "Снизить no-show",
        "description": "35 клиентов (12.5%) не пришли на запись",
        "suggestion": "Добавьте напоминания за 24 часа и за 2 часа до визита",
        "priority": "medium"
    }
]

stage_details = [
    {"stage": "Посетители", "count": 1500, "conversion": "100%", "losses": 0, "status": "excellent"},
    {"stage": "Вовлечённые", "count": 850, "conversion": "56.7%", "losses": 650, "status": "medium"},
    {"stage": "Начали запись", "count": 420, "conversion": "49.4%", "losses": 430, "status": "medium"},
    {"stage": "Записались", "count": 280, "conversion": "66.7%", "losses": 140, "status": "good"},
    {"stage": "Посетили", "count": 245, "conversion": "87.5%", "losses": 35, "status": "excellent"},
]


funnel_stages = [
    {
        "stage": "Посетители",
        "description": "Первичные посетители сайта/соцсетей",
        "count": 1500,
        "rate": 100,
        "color": "bg-blue-500",
        "losses": 0
    },
    {
        "stage": "Вовлечённые",
        "description": "Проявили интерес (лайк, комментарий, просмотр)",
        "count": 850,
        "rate": 56.7,
        "color": "bg-cyan-500",
        "losses": 650
    },
    {
        "stage": "Начали запись",
        "description": "Открыли форму записи",
        "count": 420,
        "rate": 49.4,
        "color": "bg-green-500",
        "losses": 430
    },
    {
        "stage": "Записались",
        "description": "Завершили бронирование",
        "count": 280,
        "rate": 66.7,
        "color": "bg-amber-500",
        "losses": 140
    },
    {
        "stage": "Посетили",
        "description": "Пришли на процедуру",
        "count": 245,
        "rate": 87.5,
        "color": "bg-pink-500",
        "losses": 35
    }
]



@app.get("/manager/funnel")
async def manager_funnel(request: Request, period: Optional[str] = "month", start_date: Optional[str] = None, end_date: Optional[str] = None):
    show_custom_dates = period == "custom"
    return templates.TemplateResponse(
        "manager/funnel.html",
        {
            "request": request,
            "funnel_stages": funnel_stages,
            "conversion_metrics": conversion_metrics,
            "recommendations": recommendations,
            "stage_details": stage_details,
            "period": period,
            "show_custom_dates": show_custom_dates,
            "start_date": start_date,
            "end_date": end_date,
            "user": {"name": "Менеджер", "role": "manager"}
        }
    )

@app.get("/admin/funnel")
async def admin_funnel(request: Request, period: Optional[str] = "month", start_date: Optional[str] = None, end_date: Optional[str] = None):
    show_custom_dates = period == "custom"
    return templates.TemplateResponse(
        "manager/funnel.html",
        {
            "request": request,
            "funnel_stages": funnel_stages,
            "conversion_metrics": conversion_metrics,
            "recommendations": recommendations,
            "stage_details": stage_details,
            "period": period,
            "show_custom_dates": show_custom_dates,
            "start_date": start_date,
            "end_date": end_date,
            "user": {"name": "Админ", "role": "admin"}
        }
    )

@app.post("/manager/funnel/export")
async def manager_export():
    # Для менеджера: базовый экспорт (например, JSON)
    return JSONResponse(content={
        "funnel_stages": funnel_stages,
        "conversion_metrics": conversion_metrics,
        "stage_details": stage_details
    })

@app.post("/admin/funnel/export")
async def admin_export():
    # Для администратора: экспорт в CSV
    csv_content = "Stage,Count,Conversion,Losses,Status\n"
    for stage in stage_details:
        csv_content += f"{stage['stage']},{stage['count']},{stage['conversion']},{stage['losses']},{stage['status']}\n"
    return {
        "content": csv_content,
        "headers": {
            "Content-Disposition": "attachment; filename=funnel_data.csv",
            "Content-Type": "text/csv"
        }
    }

@app.get("/admin/bookings")
async def admin_bookings(request: Request, search: Optional[str] = "", status: Optional[str] = "all"):
    filtered_bookings = [
        booking for booking in mock_bookings
        if (search.lower() in booking.client.lower() or
            search.lower() in booking.service.lower()) and
           (status == "all" or booking.status == status)
    ]
    stats = {
        "pending": len([b for b in mock_bookings if b.status == "pending"]),
        "completed": len([b for b in mock_bookings if b.status == "completed"]),
        "total": len(mock_bookings),
        "revenue": sum(b.amount for b in mock_bookings if b.status == "completed")
    }
    return templates.TemplateResponse(
        "admin/bookings.html",
        {
            "request": request,
            "bookings": filtered_bookings,
            "stats": stats,
            "search_term": search,
            "status_filter": status,
            "user": {"name": "Администратор", "role": "admin"}
        }
    )

@app.post("/admin/bookings/{id}/status")
async def update_booking_status(id: int, status: str = Form(...)):
    for booking in mock_bookings:
        if booking.id == id:
            booking.status = status
            break
    return RedirectResponse(url="/admin/bookings", status_code=303)

@app.get("/admin/users")
async def admin_users(request: Request, search: Optional[str] = ""):
    filtered_users = [
        user for user in mock_users
        if (search.lower() in user.name.lower() or
            search.lower() in user.surname.lower() or
            search.lower() in user.username.lower() or
            search.lower() in user.email.lower())
    ]
    return templates.TemplateResponse(
        "admin/users.html",
        {
            "request": request,
            "users": filtered_users,
            "search_term": search,
            "user": {"name": "Администратор", "role": "admin"}
        }
    )

@app.get("/admin/users/create")
async def create_user(request: Request):
    return templates.TemplateResponse(
        "admin/create_user.html",
        {
            "request": request,
            "user": {"name": "Администратор", "role": "admin"}
        }
    )

@app.post("/admin/users/create")
async def post_create_user(
    request: Request,
    name: str = Form(...),
    surname: str = Form(""),
    username: str = Form(...),
    email: str = Form(""),
    password: str = Form(...),
    role: str = Form(...)
):
    if len(password) < 6:
        return templates.TemplateResponse(
            "admin/create_user.html",
            {
                "request": request,
                "error": "Пароль должен содержать минимум 6 символов",
                "form_data": {"name": name, "surname": surname, "username": username, "email": email, "role": role},
                "user": {"name": "Администратор", "role": "admin"}
            }
        )
    # Add new user to mock_users
    new_id = max(user.id for user in mock_users) + 1 if mock_users else 1
    new_user = User(id=new_id, name=name, surname=surname, username=username, email=email, role=role, status="active", createdAt=datetime.now().strftime("%Y-%m-%d"))
    mock_users.append(new_user)
    return RedirectResponse(url="/admin/users", status_code=303)

@app.get("/admin/bookings/{id}")
async def admin_booking_detail(request: Request, id: int):
    # Find booking by id or use mock
    booking = next((b for b in mock_bookings if b.id == id), mock_booking_detail)
    return templates.TemplateResponse(
        "admin/booking_detail.html",
        {
            "request": request,
            "booking": booking,
            "user": {"name": "Администратор", "role": "admin"}
        }
    )

@app.post("/admin/bookings/{id}/update")
async def update_booking_detail(
    id: int,
    status: str = Form(...),
    notes: str = Form(...)
):
    for booking in mock_bookings:
        if booking.id == id:
            booking.status = status
            # Add notes if needed
            break
    return RedirectResponse(url=f"/admin/bookings/{id}", status_code=303)

@app.get("/admin/calendar")
async def admin_calendar(request: Request):
    return templates.TemplateResponse(
        "admin/calendar.html",
        {
            "request": request,
            "user": {"name": "Администратор", "role": "admin"}
        }
    )

@app.get("/admin/services")
async def admin_services(request: Request, search: Optional[str] = "", category: Optional[str] = ""):
    filtered_services = [
        service for service in mock_services
        if (search.lower() in service.nameRu.lower() or search.lower() in service.name.lower()) and
           (not category or service.category == category)
    ]
    categories = list(set(s.category for s in mock_services))
    return templates.TemplateResponse(
        "admin/services.html",
        {
            "request": request,
            "services": filtered_services,
            "categories": categories,
            "search_term": search,
            "category_filter": category,
            "user": {"name": "Администратор", "role": "admin"}
        }
    )

@app.get("/admin/settings")
async def admin_settings(request: Request):
    return templates.TemplateResponse(
        "admin/settings.html",
        {
            "request": request,
            "general_settings": mock_settings["general_settings"],
            "bot_settings": mock_settings["bot_settings"],
            "notification_settings": mock_settings["notification_settings"],
            "user": {"name": "Администратор", "role": "admin"}
        }
    )


def filter_messages(messages, search: str = "", category: str = "all", status: str = "all"):
    filtered = messages
    if search:
        filtered = [
            msg for msg in filtered
            if search.lower() in msg["from"].lower()
            or search.lower() in msg["subject"].lower()
            or search.lower() in msg["preview"].lower()
        ]
    if category != "all":
        filtered = [msg for msg in filtered if msg["category"] == category]
    if status != "all":
        filtered = [msg for msg in filtered if msg["status"] == status]
    return filtered

@app.get("/manager/messages")
async def manager_messages(request: Request, search: Optional[str] = "", category: Optional[str] = "all", status: Optional[str] = "all"):
    filtered_messages = filter_messages(mock_messages, search, category, status)
    unread_count = sum(1 for msg in mock_messages if msg["unread"])
    starred_count = sum(1 for msg in mock_messages if msg["starred"])
    return templates.TemplateResponse(
        "manager/messages.html",
        {
            "request": request,
            "messages": mock_messages,
            "filtered_messages": filtered_messages,
            "unread_count": unread_count,
            "starred_count": starred_count,
            "categories": categories,
            "statuses": statuses,
            "search": search,
            "category": category,
            "status_filter": status,
            "selected_ids": [],
            "user": {"name": "Менеджер", "role": "manager"}
        }
    )

@app.get("/admin/messages")
async def admin_messages(request: Request, search: Optional[str] = "", category: Optional[str] = "all", status: Optional[str] = "all"):
    filtered_messages = filter_messages(mock_messages, search, category, status)
    unread_count = sum(1 for msg in mock_messages if msg["unread"])
    starred_count = sum(1 for msg in mock_messages if msg["starred"])
    return templates.TemplateResponse(
        "manager/messages.html",
        {
            "request": request,
            "messages": mock_messages,
            "filtered_messages": filtered_messages,
            "unread_count": unread_count,
            "starred_count": starred_count,
            "categories": categories,
            "statuses": statuses,
            "search": search,
            "category": category,
            "status_filter": status,
            "selected_ids": [],
            "user": {"name": "Админ", "role": "admin"}
        }
    )

@app.post("/manager/messages/mark-read")
async def manager_mark_read(selected_ids: str = Form(...)):
    ids = [int(id) for id in selected_ids.split(",") if id]
    for msg in mock_messages:
        if msg["id"] in ids:
            msg["unread"] = False
    return RedirectResponse(url="/manager/messages", status_code=303)

@app.post("/manager/messages/archive")
async def manager_archive(selected_ids: str = Form(...)):
    ids = [int(id) for id in selected_ids.split(",") if id]
    for msg in mock_messages:
        if msg["id"] in ids:
            msg["status"] = "archived"
    return RedirectResponse(url="/manager/messages", status_code=303)

@app.post("/admin/messages/mark-read")
async def admin_mark_read(selected_ids: str = Form(...)):
    ids = [int(id) for id in selected_ids.split(",") if id]
    for msg in mock_messages:
        if msg["id"] in ids:
            msg["unread"] = False
    return RedirectResponse(url="/admin/messages", status_code=303)

@app.post("/admin/messages/archive")
async def admin_archive(selected_ids: str = Form(...)):
    ids = [int(id) for id in selected_ids.split(",") if id]
    for msg in mock_messages:
        if msg["id"] in ids:
            msg["status"] = "archived"
    return RedirectResponse(url="/admin/messages", status_code=303)

@app.post("/admin/messages/delete")
async def admin_delete(selected_ids: str = Form(...)):
    global mock_messages
    ids = [int(id) for id in selected_ids.split(",") if id]
    mock_messages = [msg for msg in mock_messages if msg["id"] not in ids]
    return RedirectResponse(url="/admin/messages", status_code=303)

@app.post("/{role}/messages/toggle-star/{message_id}")
async def toggle_star(role: str, message_id: int):
    if role not in ["manager", "admin"]:
        raise HTTPException(status_code=403, detail="Invalid role")
    for msg in mock_messages:
        if msg["id"] == message_id:
            msg["starred"] = not msg["starred"]
            break
    return RedirectResponse(url=f"/{role}/messages", status_code=303)

# Manager Routes (based on ManagerLayout.tsx)
@app.get("/manager/dashboard")
async def manager_dashboard(request: Request):
    return templates.TemplateResponse(
        "manager/dashboard.html",
        {
            "request": request,
            "stats": mock_dashboard["stats"],
            "recent_bookings": mock_dashboard["recent_bookings"],
            "user": {"name": "Менеджер", "role": "manager"}
        }
    )



@app.get("/manager/chat")
async def manager_chat(request: Request):
    return templates.TemplateResponse(
        "manager/chat.html",
        {
            "request": request,
            "chat": mock_chat,
            "user": {"name": "Менеджер", "role": "manager"}
        }
    )

@app.get("/manager/clients")
async def manager_clients(request: Request, search: Optional[str] = ""):
    filtered_clients = [
        client for client in mock_clients
        if (search.lower() in client.name.lower() or
            search in client.phone or
            search.lower() in client.email.lower())
    ]
    return templates.TemplateResponse(
        "admin/clients.html",
        {
            "request": request,
            "clients": filtered_clients,
            "search_term": search,
            "user": {"name": "Менеджер", "role": "manager"}
        }
    )

@app.get("/manager/analytics")
async def manager_analytics(request: Request):
    return templates.TemplateResponse(
        "admin/analytics.html",
        {
            "request": request,
            "bookings_trend_data": mock_analytics["bookings_trend_data"],
            "services_data": mock_analytics["services_data"],
            "status_data": mock_analytics["status_data"],
            "revenue_data": mock_analytics["revenue_data"],
            "top_services": mock_analytics["top_services"],
            "user": {"name": "Менеджер", "role": "manager"}
        }
    )



@app.get("/manager/settings")
async def manager_settings(request: Request):
    return templates.TemplateResponse(
        "manager/settings.html",
        {
            "request": request,
            "general_settings": mock_settings["general_settings"],
            "bot_settings": mock_settings["bot_settings"],
            "notification_settings": mock_settings["notification_settings"],
            "user": {"name": "Менеджер", "role": "manager"}
        }
    )

# Employee Routes (based on EmployeeLayout.tsx)
@app.get("/employee/dashboard")
async def employee_dashboard(request: Request):
    return templates.TemplateResponse(
        "employee/dashboard.html",
        {
            "request": request,
            "recent_bookings": mock_dashboard["recent_bookings"],
            "user": {"name": "Сотрудник", "role": "employee"}
        }
    )

@app.get("/employee/calendar")
async def employee_calendar(request: Request):
    return templates.TemplateResponse(
        "employee/calendar.html",
        {
            "request": request,
            "user": {"name": "Сотрудник", "role": "employee"}
        }
    )

@app.get("/employee/profile")
async def employee_profile(request: Request):
    return templates.TemplateResponse(
        "employee/profile.html",
        {
            "request": request,
            "profile": mock_employee_profile,
            "user": {"name": "Сотрудник", "role": "employee"}
        }
    )

@app.get("/employee/settings")
async def employee_settings(request: Request):
    return templates.TemplateResponse(
        "employee/settings.html",
        {
            "request": request,
            "general_settings": mock_settings["general_settings"],
            "user": {"name": "Сотрудник", "role": "employee"}
        }
    )

# Public Routes (based on PublicLayout.tsx)
@app.get("/")
async def public_home(request: Request):
    return templates.TemplateResponse(
        "public/home.html",
        {
            "request": request,
            "data": mock_public["home"]
        }
    )

@app.get("/price-list")
async def public_price_list(request: Request):
    return templates.TemplateResponse(
        "public/price_list.html",
        {
            "request": request,
            "services": mock_public["price_list"]
        }
    )

@app.get("/about")
async def public_about(request: Request):
    return templates.TemplateResponse(
        "public/about.html",
        {
            "request": request,
            "about": mock_public["about"]
        }
    )

@app.get("/contacts")
async def public_contacts(request: Request):
    return templates.TemplateResponse(
        "public/contacts.html",
        {
            "request": request,
            "contacts": mock_public["contacts"]
        }
    )

@app.get("/faq")
async def public_faq(request: Request):
    return templates.TemplateResponse(
        "public/faq.html",
        {
            "request": request,
            "faq": mock_public["faq"]
        }
    )

@app.get("/cooperation")
async def public_cooperation(request: Request):
    return templates.TemplateResponse(
        "public/cooperation.html",
        {
            "request": request
        }
    )

@app.get("/privacy-policy")
async def public_privacy_policy(request: Request):
    return templates.TemplateResponse(
        "public/privacy-policy.html",
        {
            "request": request
        }
    )

@app.get("/terms")
async def public_terms(request: Request):
    return templates.TemplateResponse(
        "public/terms.html",
        {
            "request": request
        }
    )

@app.get("/success")
async def public_success(request: Request):
    return templates.TemplateResponse(
        "public/success.html",
        {
            "request": request,
            "bookingData": {}  # Mock or from session
        }
    )

@app.get("/cabinet")
async def public_cabinet(request: Request):
    return templates.TemplateResponse(
        "public/cabinet.html",
        {
            "request": request,
            "bookings": mock_bookings,
            "availableSlots": availableSlots,
            "profile": {"name": "Анна Иванова", "email": "anna@example.com", "phone": "+971 50 123 4567"}
        }
    )

# Auth Routes (login)
@app.get("/login")
async def login(request: Request):
    return templates.TemplateResponse(
        "auth/login.html",
        {
            "request": request
        }
    )

# Placeholder for logout (redirect to login)
@app.get("/logout")
async def logout():
    return RedirectResponse(url="/login", status_code=303)