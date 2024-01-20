const findDiagnosis = (jsonData, keyLevel1, keyLevel2, value) => {
    try {
      const characteristics = jsonData[keyLevel1]?.[keyLevel2]?.['đặc tính'];
      
      if (typeof value === 'object') {
        // Nếu value là một đối tượng, duyệt qua từng phần tử và thực hiện truy vấn
        const diagnoses = Object.entries(value).reduce((acc, [index, item]) => {
          const diagnosis = characteristics?.[item]?.['chẩn đoán'];
          if (diagnosis) {
            acc.push(`${diagnosis}`);
          }
          return acc;
        }, []);
  
        return diagnoses.length > 0 ? diagnoses : null;
      } else {
        // Nếu value là một giá trị đơn, thực hiện truy vấn như bình thường
        const diagnosis = characteristics?.[value]?.['chẩn đoán'];
        return diagnosis;
      }
    } catch (error) {
      console.error('Error finding diagnosis:', error);
      return null;
    }
  };

  
  
  const processAndQueryData = (data, jsonData) => {
    const results = {};
  
    // Duyệt qua keyLevel1 trong dữ liệu đầu vào
    for (const keyLevel1 in data) {
      const keyLevel2Data = data[keyLevel1];
  
      // Khởi tạo keyLevel1 nếu chưa tồn tại
      if (!results[keyLevel1]) {
        results[keyLevel1] = {};
      }
  
      // Duyệt qua keyLevel2 trong dữ liệu đầu vào
      for (const keyLevel2 in keyLevel2Data) {
        const value = keyLevel2Data[keyLevel2];
  
        // Kiểm tra nếu giá trị của keyLevel2 là một đối tượng
        if (typeof value === 'object' && value !== null) {
          // Khởi tạo keyLevel2 nếu chưa tồn tại
          if (!results[keyLevel1][keyLevel2]) {
            results[keyLevel1][keyLevel2] = {};
          }
  
          // Sử dụng findDiagnosis để lấy giá trị 'chẩn đoán'
          const diagnosis = findDiagnosis(jsonData, keyLevel1, keyLevel2, value);
  
          // Thêm giá trị và chẩn đoán vào keyLevel2
          Object.entries(diagnosis).forEach(([key, diagnosisValue]) => {
            const actualKey = value[key];
            results[keyLevel1][keyLevel2][actualKey] = diagnosisValue;
          });
        } else {
          // Sử dụng findDiagnosis để lấy giá trị 'chẩn đoán'
          const diagnosis = findDiagnosis(jsonData, keyLevel1, keyLevel2, value);
  
          // Thêm giá trị và chẩn đoán vào keyLevel2
          results[keyLevel1][keyLevel2] = {
            [value]: diagnosis,
          };
        }
      }
    }
  
    console.log('Final Results:', results);
    return results;
  };
          
  export default processAndQueryData;
  