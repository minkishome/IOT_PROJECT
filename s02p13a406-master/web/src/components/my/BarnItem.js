import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const BarnItem = ({ b_id, loading, error, livestocks }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  // 에러 발생 시
  if (error) {
    console.log(error)
    return <Card className={classes.card}><CardHeader title="에러가 발생했습니다"/></Card>
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card}>
      <Link to={`/mypage/barn/${b_id}`}>
      <CardHeader
        avatar={
          
            <Avatar aria-label="recipe" className={classes.avatar}>
              축
            </Avatar>
       
        }
        title="축사 이름"
        subheader="축사 등록 날짜"
      />
      <CardMedia
        className={classes.media}
        image={require('../../pages/card_image/소간지.jpg')}
        title="축사 이름"
      />
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          축사 설명
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {!loading && livestocks &&
          <CardContent>
            {livestocks.map((livestock, index) => (
            <Link to={`/mypage/livestock/${livestock['ls_id']}`} key={index} >
              <Typography paragraph>
                {`가축 ${livestocks.indexOf(livestock) + 1}`}
              </Typography>
            </Link>
            ))}
          </CardContent>
        }
      </Collapse>
    </Card>
  )
}

export default BarnItem;