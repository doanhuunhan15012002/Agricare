export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/orders/own/') 
    const data = await response.json()
    resolve({data})
  }
  );
}


export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/users/own') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}



