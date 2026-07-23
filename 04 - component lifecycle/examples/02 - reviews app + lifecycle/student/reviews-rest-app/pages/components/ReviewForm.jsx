// react hooks
import { useState } from 'react';

// API functions
//  . -> current directory
// .. -> parent directory 
import { addReview, getReviews } from '../api/reviews';

// MUI components - layout
import Grid from '@mui/material/Grid';

// MUI components - 'physical'/inputs
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';


export default function ReviewForm({ reviews, onReviewsChange }) {
	// Why not just call the setter param "setReviews" as well?
	// React's naming conventions make it really easy to intuit/anticipate
	// code structure and behaviour based on naming -- you get a lot of 
	// information before even reading implementation.

	// For example: "use..." -> I know this is a hook without looking at further code.

	// In the same way, "set..." -> I should be able to assume that state is being set
	// *at this level of scope*. I'll call the input prop onReviewsChange to mirror e.g.
	// MUI components' onChange/onClick etc. -> almost like a 'custom event' handler.

	// This is me just being picky and explaining my choice -- but when we have shared state,
	// it keeps things REALLY clear in terms of what level of scope that state sits on if I
	// only let myself use "set..." in the same level of scope that state lives.

  const [title, setTitle]       = useState("")
  const [comments, setComments] = useState("")
  const [rating, setRating]     = useState(0)

  const loadAllReviews = () => {
    // I'm demonstrating 'bad practice' in the interest of concision;
    // ideally, API functions would be in a separate layer from rendering.
    getReviews()
      .then((data) => {
        onReviewsChange(data)
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addReview({ 
      title,
      comment: comments,
      rating 
    }).then((newReview) => {
      onReviewsChange([newReview, ...reviews]) // new thing first so it shows at the top of the list.
    })
    resetForm();
  }

  const resetForm = () => {
    setTitle("");
    setComments("");
    setRating(0);
  }

	return (
		<>
		  <form
		    onSubmit={handleSubmit}
		  >

		    <Grid container spacing={3} sx={{ mt: 5, mb: 10 }}>
		      <Grid item sm={12} md={12}>
		        <TextField
		          id="title"
		          name="title"
		          label="Adaptation Title"
		          fullWidth
		          variant="standard"
		          value={title}
		          onChange={(e) => setTitle(e.target.value)}
		        />
		      </Grid>

		      <Grid item sm={12} md={12}>
		        <TextField
		          id="review-comments"
		          name="review-comments"
		          label="Comments"
		          fullWidth
		          variant="standard"
		          value={comments}
		          onChange={(e) => setComments(e.target.value)}
		        />
		      </Grid>

		      <Grid item sm={12} md={12}>
		        <FormControl>
		          <FormLabel id="adaptation-rating">Rating</FormLabel>
		          <RadioGroup
		            row
		            aria-labelledby="adaptation-rating"
		            name="rating-buttons-group"
		            value={rating}
		            onChange={(e) => setRating(parseInt(e.target.value))}
		          >
		            <FormControlLabel value="1" control={<Radio />} label="1" />
		            <FormControlLabel value="2" control={<Radio />} label="2" />
		            <FormControlLabel value="3" control={<Radio />} label="3" />
		            <FormControlLabel value="4" control={<Radio />} label="4" />
		            <FormControlLabel value="5" control={<Radio />} label="5" />
		            <FormControlLabel value="6" control={<Radio />} label="6" />
		            <FormControlLabel value="7" control={<Radio />} label="7" />
		            <FormControlLabel value="8" control={<Radio />} label="8" />
		            <FormControlLabel value="9" control={<Radio />} label="9" />
		            <FormControlLabel value="10" control={<Radio />} label="10" />
		          </RadioGroup>
		       </FormControl>
		      </Grid>

		      <Grid item sm={12} md={3}>
		        <Button
		          variant="contained"
		          type="submit"
		        >
		          Add New Review
		        </Button>
		      </Grid>

		      {/* I wanna restyle / reorganise things visually a bit, starting with this button */}
		      <Grid item sm={12} md={4}>
			      <Button
			        variant="outlined"
			        onClick={loadAllReviews}
			      >
			        Load All Current Reviews
			      </Button>
			    </Grid>

		    </Grid>

		  </form>


    </>
	)
}