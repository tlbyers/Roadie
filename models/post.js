module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    // user_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
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

  
  } //END OF THE SECOND ARGUMENT
  // This is in case we want to add more than one users... 
    // ,{
    //   // We're saying that we want our Author to have Posts
    //   classMethods: {
    //     associate: function(models) {
    //       // An Author (foreignKey) is required or a Post can't be made
    //       Post.belongsTo(models.Author, {
    //         foreignKey: {
    //           allowNull: false
    //         }
    //       });
    //     }
    //   }
    // }
  );
  return Post;
};
