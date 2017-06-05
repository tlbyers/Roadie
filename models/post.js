module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }, 
    event_name: {
      type: DataTypes.STRING
    },
    event_date:{
      type: DataTypes.STRING
    },
    event_note: {
      type:DataTypes.TEXT
    },
    completed: {
      type: DataTypes.BOOLEAN,
    }

  
  }  
  );
  return Post;
};
