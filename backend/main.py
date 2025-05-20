from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
import requests
from bs4 import BeautifulSoup
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base
from typing import List
from fastapi import Depends

origins = [
    "http://localhost:4200",
    "http://localhost:4000",
]

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Bienvenue sur mon API FastAPI"} 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize CryptContext for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to hash password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)   

# Function to verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

class Departement(BaseModel):
    id: int
    nom: str

class Formation(BaseModel):
    id: int
    nom: str

class Etudiant(BaseModel):
    id: int
    nom: str
    prenom: str
    email: str
    telephone: str
    password: str

class Cours(BaseModel):
    etudiant_id: int
    Formation_id: int

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["students-management"]

PG_DB_URL = "postgresql+psycopg2://postgres:0000@localhost:5432/books"

Base = declarative_base()

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    price = Column(Float)
    availability = Column(String)
    category = Column(String, index=True)

engine = create_engine(PG_DB_URL)
SessionLocal = sessionmaker(bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

@app.get("/etudiants")
async def liste_etudiants():
    collection = db["etudiants"]
    etudiants = await collection.find({}, {"_id": 0}).to_list(length=None)
    return etudiants

@app.get("/departements")
async def liste_departements():
    collection = db["departements"]
    departements = await collection.find({}, {"_id": 0}).to_list(length=None)
    return departements

@app.get("/formations")
async def liste_formations():
    collection = db["formations"]
    formations = await collection.find({}, {"_id": 0}).to_list(length=None)
    return formations

@app.get("/etudiants/{item_id}")
async def get_etudiant(item_id: int):
    collection = db["etudiants"]
    etudiant = await collection.find_one({"id": item_id}, {"_id": 0})
    return etudiant

@app.get("/departements/{item_id}")
async def get_departement(item_id: int):
    collection = db["departements"]
    departement = await collection.find_one({"id": item_id}, {"_id": 0})
    return departement

@app.get("/formations/{item_id}")
async def get_formation(item_id: int):
    collection = db["formations"]
    formation = await collection.find_one({"id": item_id}, {"_id": 0})
    return formation

@app.put("/formations/{item_id}")
async def update_formation(item_id: int, item: dict):  
    collection = db["formations"]
    result = await collection.update_one(
        {"id": item_id},
        {"$set": item}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item updated successfully"}

@app.put("/departements/{item_id}")
async def update_departement(item_id: int, item: dict):  
    collection = db["departements"]
    result = await collection.update_one(
        {"id": item_id},
        {"$set": item}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item updated successfully"}

@app.put("/etudiants/{item_id}")
async def update_etudiant(item_id: int, item: dict):  
    collection = db["etudiants"]
    result = await collection.update_one(
        {"id": item_id},
        {"$set": item}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item updated successfully"}

@app.delete("/formations/{item_id}")
async def delete_formation(item_id: int):  
    collection = db["formations"]
    await collection.delete_one(
        {"id": item_id},
    )
    return {"message": "Item deleted successfully"}

@app.delete("/etudiants/{item_id}")
async def delete_etudiant(item_id: int):  
    collection = db["etudiants"]
    await collection.delete_one(
        {"id": item_id},
    )
    return {"message": "Item deleted successfully"}

@app.delete("/departements/{item_id}")
async def delete_departement(item_id: int):  
    collection = db["departements"]
    await collection.delete_one(
        {"id": item_id},
    )
    return {"message": "Item deleted successfully"}

@app.post("/departements")
async def ajouter_departement(item: dict):  
    collection = db["departements"]
    result = await collection.insert_one(item)
    return {"message": "Item created successfully"}

@app.post("/formations")
async def ajouter_formation(item: dict):  
    collection = db["formations"]
    result = await collection.insert_one(item)
    return {"message": "Item created successfully"}

@app.post("/login")
async def login(item: dict):  
    collection = db["etudiants"]
    result = await collection.find_one({"email": item['email']}, {"_id": 0})
    if(result is None):
        raise HTTPException(status_code=401, detail="Utilisateur Introuvable")
    if verify_password(item['password'], result['password']):
        return result
    else:
        raise HTTPException(status_code=401, detail="Email ou mot de passe invalide")

@app.post("/register")
async def register(item: dict):  
    collection = db["etudiants"]
    item['id'] = int(item['id'])
    del item["confirm"]
    item['password'] = hash_password(item['password'])
    result = await collection.insert_one(item)
    return {"message": "Item created successfully"}

@app.post("/inscription-cours")
async def inscription_cours(item: dict):  
    collection = db["cours"]
    item['etudiant_id'] = int(item['etudiant_id'])
    item['formation_id'] = int(item['formation_id'])
    result = await collection.insert_one(item)
    return {"message": "Item created successfully"}

@app.get("/cours-etudiant/{item_id}")
async def cours_etudiant(item_id: int):  
    collection = db["cours"]
    result = await collection.find({"etudiant_id": item_id}, {"_id": 0}).to_list(length=None)
    formations = []
    for item in result:
        formation = await db["formations"].find_one({"id": item['formation_id']}, {"_id": 0})
        formations.append(formation)
    return formations   

def scrape_books():
    base_url = "https://books.toscrape.com/"
    category_url = base_url + "catalogue/category/books_1/index.html"
    books = []

    # The website uses pagination, so loop through pages
    while category_url:
        response = requests.get(category_url)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, "html.parser")

        # Scrape all books on this page
        articles = soup.find_all("article", class_="product_pod")
        print(len(articles))
        for article in articles:
            # Title
            title = article.h3.a['title']

            # Price
            price_str = article.find("p", class_="price_color").text.strip()
            price = float(price_str.replace("£", ""))

            # Availability
            availability = article.find("p", class_="instock availability").text.strip()

            # Category: we have to go to the book detail page to get the category
            book_rel_url = article.h3.a['href']
            book_url = base_url + "catalogue/" + book_rel_url.replace("../../", "")

            book_page = requests.get(book_url)
            book_soup = BeautifulSoup(book_page.text, "html.parser")

            # Category is in breadcrumb > second last <li> before active
            breadcrumb = book_soup.select("ul.breadcrumb li")
            # category is usually the 3rd item in breadcrumb (index 2)
            category = breadcrumb[2].text.strip()

            books.append({
                "title": title,
                "price": price,
                "availability": availability,
                "category": category
            })

        # Check if there's a next page
        next_btn = soup.select_one("li.next a")
        next_btn = False
        category_url = None

    return books

@app.post("/scrape-books")
def scrape_and_save():
    session = SessionLocal()
    books = scrape_books()
    print(len(books))

    # Save to DB
    for book in books:
        # Check if book already exists by title (optional)
        existing = session.query(Book).filter(Book.title == book['title']).first()
        if not existing:
            new_book = Book(
                title=book['title'],
                price=book['price'],
                availability=book['availability'],
                category=book['category']
            )
            session.add(new_book)
    print("hani hna")
    session.commit()
    session.close()
    return {"message": f"Scraped and saved {len(books)} books."}

class BookOut(BaseModel):
    id: int
    title: str
    price: float
    availability: str
    category: str

    class Config:
        orm_mode = True

@app.get("/books", response_model=List[BookOut])
def get_books():
    session = SessionLocal()
    books = session.query(Book).all()
    return books    