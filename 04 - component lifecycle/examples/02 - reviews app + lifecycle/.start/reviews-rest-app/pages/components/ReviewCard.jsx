import Avatar from '@mui/material/Avatar';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


export default function ReviewCard({ rating, title, comment }) {

  const getRatingColour = (rating) => {

    if (!isNaN || !(1 <= rating <= 10)) {
      throw new RangeError(
        `Rating must be a number 1 and 10 inclusively. Got: ${rating}`
      )
    }

    const ranges = [
      { max: 3,  display: 'red'    },
      { max: 6,  display: 'orange' },
      { max: 8,  display: 'green'  },
      { max: 10, display: 'blue'   },
    ];

    // <= is greater than or equal to, *not* an arrow in the opposite direction!
    // i.e.: "return the first 'max' that's greater than or equal to 'rating'"
    const colour = ranges.find(
      ({ max }) => rating <= max  // destructuring in action! :)
    )

    return colour.display
  }
  
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getRatingColour(rating) }} aria-label="recipe">
            {rating}
          </Avatar>
        }
        
        title={
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        }
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  )
}
