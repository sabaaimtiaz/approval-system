

import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Menu from './Menu';

const RequestListing = () => {
  const { role } = useParams();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (role === 'Superadmin') {
          response = await axios.get('http://localhost:3001/auth/requests');
        } else if (role === 'IT') {
          response = await axios.get('http://localhost:3001/auth/requests/it');
        } else if (role === 'HR') {
          response = await axios.get('http://localhost:3001/auth/requests/hr');
        }

       
        let filteredRequests = response.data.requests;

        if (role === 'HR' || role === 'IT') {
          filteredRequests = filteredRequests.filter(
            (request) => request.superadmin_approval === 'Approved'
          );
        }

        setDataSource(filteredRequests);
      } catch (error) {
        console.error(`Error fetching ${role} requests:`, error);
        message.error(`Error fetching ${role} requests`);
      }
    };

    if (role) {
      fetchData();
    }
  }, [role]);

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:3001/auth/requests/${id}/approve`, { role });
      message.success('Request approved successfully!');
      setDataSource((prevData) =>
        prevData.map((request) =>
          request.id === id ? { ...request, [`${role.toLowerCase()}_approval`]: 'Approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving request:', error);
      message.error('Error approving request');
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.post(`http://localhost:3001/auth/requests/${id}/decline`, { role });
      message.success('Request declined successfully!');
      setDataSource((prevData) =>
        prevData.map((request) =>
          request.id === id ? { ...request, [`${role.toLowerCase()}_approval`]: 'Declined' } : request
        )
      );
    } catch (error) {
      console.error('Error declining request:', error);
      message.error('Error declining request');
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'lastName',
    },
    {
      title: 'Request Title',
      dataIndex: 'request_title',
      key: 'requestTitle',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Request Type',
      dataIndex: 'request_type',
      key: 'requestType',
    },
    {
      title: 'Request Sub Type',
      dataIndex: 'request_subtype',
      key: 'requestSubType',
    },
    ...(role === 'Superadmin'
      ? [
          {
            title: 'Superadmin Approval',
            dataIndex: 'superadmin_approval',
            key: 'superadminApproval',
          },
          {
            title: 'HR Approval',
            dataIndex: 'hr_approval',
            key: 'hrApproval',
          },
          {
            title: 'IT Approval',
            dataIndex: 'it_approval',
            key: 'itApproval',
          },
        ]
      : role === 'HR'
      ? [
          {
            title: 'HR Approval',
            dataIndex: 'hr_approval',
            key: 'hrApproval',
          },
        ]
      : role === 'IT'
      ? [
          {
            title: 'IT Approval',
            dataIndex: 'it_approval',
            key: 'itApproval',
          },
        ]
      : []),
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>               
          <Button
            onClick={() => handleApprove(record.id)}
            disabled={
              record[`${role.toLowerCase()}_approval`] === 'Approved' ||
              record[`${role.toLowerCase()}_approval`] === 'Declined'
            }
          >
            Approve
          </Button>
          <Button
            onClick={() => handleDecline(record.id)}
            disabled={
              record[`${role.toLowerCase()}_approval`] === 'Approved' ||
              record[`${role.toLowerCase()}_approval`] === 'Declined'
            }
          >
            Disapprove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Menu />
      <div style={{ marginTop: '2rem' }}>
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
      </div>
    </>
  );
};

export default RequestListing;
