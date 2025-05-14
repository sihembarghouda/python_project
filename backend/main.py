from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext


origins = [
    "http://localhost:4200",
    "http://localhost:4000",
]

app = FastAPI()

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