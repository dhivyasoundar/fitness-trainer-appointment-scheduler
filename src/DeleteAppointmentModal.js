
export const deleteAppointment = (clients, clientId, appointmentIndex) => {
    return clients.map((client) => {
      if (client.id === clientId) {
        const updatedAppointments = [...client.appointments];
        updatedAppointments.splice(appointmentIndex, 1);
        return { ...client, appointments: updatedAppointments };
      }
      return client;
    });
  };
  