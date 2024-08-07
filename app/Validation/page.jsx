"use client"
import React, { useState, useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Authentication from '../../components/Authentication';

const RequestsInbox = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [decision, setDecision] = useState('');
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  useEffect(() => {
    // Fetch initial data from the "database"
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const response = await fetch('http://localhost:3010/requisitions/validate', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json'}
    })
    const data = await response.json()

    setRequests(data);
  };

  const handleOpenRequest = (request) => {
    if (selectedRequest && selectedRequest.id === request.id) {
      setSelectedRequest(null); // Close the request if it's already selected
    } else {
      setSelectedRequest(request);
      setReasonError('');
    }
  };

  const handleDecisionChange = (e) => {
    setDecision(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    setReasonError('');
  };

  const handleSubmitDecision = () => {
    if (reason.trim() === '') {
      setReasonError('Reason is required.');
      return;
    }
    console.log(`Request ID: ${selectedRequest.id}, Decision: ${decision}, Reason: ${reason}`);
    setSelectedRequest(null);
  };

  return (
   <>
   <Authentication>
   <NavBar/>
   <div className='flex'>
    <SideBar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Requests Inbox</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Current Month's Budget: $10,000</h2>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Requests Needing Action</h2>
        <div className="space-y-2">
          {requests.map((request) => (
            <div key={request.id} className="border p-2 rounded cursor-pointer bg-white" onClick={() => handleOpenRequest(request)}>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <p className="font-semibold">{request.requisitor.name}</p>
                  <p>{request.status}</p>
                </div>
                <div>
                  <p>Request Date: {request.createdAt}</p>
                </div>
                <div>
                  <p>Due Date: {request.dueDate}</p>
                </div>
                <div>
                  <p>Department: {request.department.name}</p>
                </div>
                <div>
                  <p>Category: {request.category.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRequest && (
        <div className="mt-8 border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Review Request</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Requestor Name</label>
              <input
                type="text"
                name="requestorName"
                value={selectedRequest.requisitor.name}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={selectedRequest.department.name}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Request Date</label>
              <input
                type="date"
                name="requestDate"
                value={selectedRequest.createdAt}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={selectedRequest.dueDate}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Product Description</label>
              <input
                type="text"
                name="productDescription"
                value={selectedRequest.description}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Justification</label>
              <input
                type="text"
                name="justification"
                value={selectedRequest.justification}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Preferred Vendors</label>
              <input
                type="text"
                name="preferredVendors"
                value={selectedRequest.preferredVendors}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={selectedRequest.category.name}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Decision</label>
              <select value={decision} onChange={handleDecisionChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="" disabled>Select Decision</option>
                <option value="approve">Approve</option>
                <option value="deny">Deny</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Reason</label>
              <textarea
                value={reason}
                onChange={handleReasonChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {reasonError && <p className="text-red-500">{reasonError}</p>}
            </div>
            <button
              onClick={handleSubmitDecision}
              className={`flex items-center px-4 py-2 rounded ${decision === 'approve' ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {decision === 'approve' ? <AiOutlineCheckCircle className="mr-2" /> : <AiOutlineCloseCircle className="mr-2" />}
              {decision === 'approve' ? 'Approve' : 'Deny'} Request
            </button>
          </div>
        </div>
      )}
    </div>
   </div>
   </Authentication>
   </>
  );
};

export default RequestsInbox;