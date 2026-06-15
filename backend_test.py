#!/usr/bin/env python3
"""
Backend API Testing Script for MedBridge Educare
Tests all API endpoints with proper validation
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://medbridge-global.preview.emergentagent.com/api"

def print_test_header(test_name):
    """Print formatted test header"""
    print(f"\n{'='*60}")
    print(f"TEST: {test_name}")
    print(f"{'='*60}")

def print_result(success, message):
    """Print test result"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

def test_health_check():
    """Test GET /api/health endpoint"""
    print_test_header("Health Check Endpoint")
    
    try:
        url = f"{BASE_URL}/health"
        print(f"Request: GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'ok':
                print_result(True, "Health check endpoint working correctly")
                return True
            else:
                print_result(False, f"Unexpected response data: {data}")
                return False
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_submit_lead_valid():
    """Test POST /api/leads with valid data"""
    print_test_header("Submit Lead - Valid Data")
    
    try:
        url = f"{BASE_URL}/leads"
        payload = {
            "name": "Rajesh Kumar",
            "phone": "+91 98765 43210",
            "email": "rajesh.kumar@example.com",
            "message": "I am interested in MBBS in Russia. Please provide more details.",
            "source": "website_contact"
        }
        
        print(f"Request: POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and data.get('leadId'):
                print_result(True, f"Lead submitted successfully with ID: {data.get('leadId')}")
                return True
            else:
                print_result(False, f"Missing success or leadId in response: {data}")
                return False
        else:
            print_result(False, f"Expected status 201, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_submit_lead_missing_name():
    """Test POST /api/leads with missing name (validation)"""
    print_test_header("Submit Lead - Missing Name (Validation)")
    
    try:
        url = f"{BASE_URL}/leads"
        payload = {
            "phone": "+91 98765 43210",
            "email": "test@example.com",
            "message": "Test message"
        }
        
        print(f"Request: POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print_result(True, f"Validation working correctly: {data.get('error')}")
                return True
            else:
                print_result(False, f"Expected error message in response: {data}")
                return False
        else:
            print_result(False, f"Expected status 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_submit_lead_missing_phone():
    """Test POST /api/leads with missing phone (validation)"""
    print_test_header("Submit Lead - Missing Phone (Validation)")
    
    try:
        url = f"{BASE_URL}/leads"
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Test message"
        }
        
        print(f"Request: POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print_result(True, f"Validation working correctly: {data.get('error')}")
                return True
            else:
                print_result(False, f"Expected error message in response: {data}")
                return False
        else:
            print_result(False, f"Expected status 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_get_all_leads():
    """Test GET /api/leads endpoint"""
    print_test_header("Get All Leads")
    
    try:
        url = f"{BASE_URL}/leads"
        print(f"Request: GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")  # Print first 500 chars
        
        if response.status_code == 200:
            data = response.json()
            if 'leads' in data and isinstance(data['leads'], list):
                print_result(True, f"Retrieved {len(data['leads'])} leads successfully")
                return True
            else:
                print_result(False, f"Expected 'leads' array in response: {data}")
                return False
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_callback_request_valid():
    """Test POST /api/callback with valid data"""
    print_test_header("Callback Request - Valid Data")
    
    try:
        url = f"{BASE_URL}/callback"
        payload = {
            "name": "Priya Sharma",
            "phone": "+91 87654 32109"
        }
        
        print(f"Request: POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success'):
                print_result(True, f"Callback request submitted successfully")
                return True
            else:
                print_result(False, f"Missing success in response: {data}")
                return False
        else:
            print_result(False, f"Expected status 201, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_callback_request_missing_fields():
    """Test POST /api/callback with missing fields (validation)"""
    print_test_header("Callback Request - Missing Fields (Validation)")
    
    try:
        url = f"{BASE_URL}/callback"
        payload = {
            "name": "Test User"
            # Missing phone
        }
        
        print(f"Request: POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print_result(True, f"Validation working correctly: {data.get('error')}")
                return True
            else:
                print_result(False, f"Expected error message in response: {data}")
                return False
        else:
            print_result(False, f"Expected status 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_404_route():
    """Test non-existent route returns 404"""
    print_test_header("404 Route - Non-existent Endpoint")
    
    try:
        url = f"{BASE_URL}/nonexistent"
        print(f"Request: GET {url}")
        
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 404:
            data = response.json()
            if 'error' in data:
                print_result(True, f"404 handling working correctly: {data.get('error')}")
                return True
            else:
                print_result(False, f"Expected error message in response: {data}")
                return False
        else:
            print_result(False, f"Expected status 404, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("MedBridge Educare Backend API Testing")
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*60)
    
    results = {}
    
    # Run all tests
    results['health_check'] = test_health_check()
    results['submit_lead_valid'] = test_submit_lead_valid()
    results['submit_lead_missing_name'] = test_submit_lead_missing_name()
    results['submit_lead_missing_phone'] = test_submit_lead_missing_phone()
    results['get_all_leads'] = test_get_all_leads()
    results['callback_valid'] = test_callback_request_valid()
    results['callback_missing_fields'] = test_callback_request_missing_fields()
    results['404_route'] = test_404_route()
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("="*60)
    
    # Exit with appropriate code
    sys.exit(0 if passed == total else 1)

if __name__ == "__main__":
    main()
