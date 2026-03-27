import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestDemoAPI:
    """Tests for /api/demo endpoint"""

    def test_api_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert "Nomed" in r.json().get("message", "")

    def test_create_demo_booking(self):
        payload = {
            "nombre": "TEST_Juan",
            "apellido": "Test",
            "email": "test_nomed@example.com",
            "empresa": "TEST_Empresa",
            "producto": "Botbee",
            "desafio": "Automatizar soporte",
            "fecha": "15/06/2025",
            "hora": "10:00",
            "tipo": "calendario"
        }
        r = requests.post(f"{BASE_URL}/api/demo", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["nombre"] == "TEST_Juan"
        assert data["email"] == "test_nomed@example.com"
        assert "id" in data
        assert "created_at" in data

    def test_create_demo_minimal(self):
        """Only required fields"""
        payload = {"nombre": "TEST_Min", "email": "test_min@example.com"}
        r = requests.post(f"{BASE_URL}/api/demo", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["nombre"] == "TEST_Min"

    def test_get_demo_bookings(self):
        r = requests.get(f"{BASE_URL}/api/demo")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_create_demo_missing_required(self):
        """Should fail without nombre"""
        r = requests.post(f"{BASE_URL}/api/demo", json={"email": "noemail@test.com"})
        assert r.status_code == 422
