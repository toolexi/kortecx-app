from fastapi import FastAPI
from fastapi_pagination import add_pagination


app = FastAPI(swagger_ui_parameters={"persistAuthorization": True})
add_pagination(app)

@app.get("/")
def root_endpoint():
    return {"message": "Hello from kortecx!"}


