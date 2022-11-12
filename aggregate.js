db.products
  .aggregate([
    {
      match: {
        keywords: {
          $in: ["samsung"],
        },
      },
    },
  ])
  .pretty();
