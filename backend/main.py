from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware

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

@app.post("/etudiants")
async def ajouter_etudiant(item: dict):  
    collection = db["etudiants"]
    result = await collection.insert_one(item)
    return {"message": "Item created successfully"}

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
        raise HTTPException(status_code=401, detail="Email ou mot de passe invalide")
    return result