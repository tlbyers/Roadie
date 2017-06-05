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
      type: DataType.STRING,
      allowNull: true
    },
    event_date:{
      type: DataType.STRING
    },
    event_note: {
      type:DataType.TEXT
    },
    completed: {
      type: Boolean,
    }

  
  }  
  );
  return Post;
};
