export function mapNullProperties(data) {

    return data.map(objWithNull => {
      const objWithoutNull = {...objWithNull};
      Object.keys(objWithoutNull).forEach(key => {
        if (objWithoutNull[key] === null) {
          objWithoutNull[key] = '';
        }
      });
      return objWithoutNull;
    });
  }