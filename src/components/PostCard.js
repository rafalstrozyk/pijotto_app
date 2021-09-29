import { useState, useEffect, useContext } from "react";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";
import { booleanArrayFindObject } from "../functions/booleanArrayFind";
import CommentsBox from "./CommentsBox";
import EditPostForm from "./inputs/EditPostForm";
import Modal from "./Modal";
import { AppSatateContext } from "../contexts/AppStateContext";
import { appStateVars } from "../unchangingVars";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const StyledCard = styled(Card)`
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(55, 150, 131, 0),
      rgba(55, 150, 131, 0.75),
      rgba(55, 150, 131, 0)
    );
  }
  width: 100%;
  .card-content {
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0px;
    .post {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    > *:last-child {
      margin-top: 10px;
    }
  }
  @media only screen and (min-width: 480px) {
    max-width: calc(1200px / 4);
  }
`;

function PostCard({ post, ...rest }) {
  const { likePost, deletePost } = useFirestore();
  const { currentUser } = useAuth();
  const [, dispatch] = useContext(AppSatateContext);
  const [edited, setEdited] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: appStateVars.SCROLL_CHANGE, isScroll: !openCommentBox });
  }, [openCommentBox, dispatch]);
  function handleLike() {
    likePost(post);
  }
  function handleDelete() {
    deletePost(post);
  }
  function handleOpenCommentBox() {
    setOpenCommentBox(true);
  }

  return (
    <StyledCard classes={classes} {...rest}>
      <CardHeader title={post.nick} subheader={post.created}></CardHeader>
      <hr />
      <CardContent className="card-content">
        {edited ? (
          <EditPostForm className="post" post={post} isEditFunc={setEdited} />
        ) : (
          <Typography
            className="post"
            style={{ wordWrap: "break-word" }}
            color="textPrimary"
            component="p"
            variant="body1"
          >
            {post.text}
          </Typography>
        )}
        <hr />
        <CardActions>
          <IconButton
            color={
              post.likers &&
              booleanArrayFindObject(post.likers, currentUser.uid, "userId")
                ? "inherit"
                : "primary"
            }
            onClick={handleLike}
          >
            {post.likers &&
            booleanArrayFindObject(post.likers, currentUser.uid, "userId") ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography
            color={
              post.likers &&
              booleanArrayFindObject(post.likers, currentUser.uid, "userId")
                ? "inherit"
                : "primary"
            }
            variant="button"
          >
            {post.likes}
          </Typography>
          <IconButton color="primary" onClick={handleOpenCommentBox}>
            <ChatBubbleIcon />
          </IconButton>
          <Typography color="primary" variant="button">
            {post.coments}
          </Typography>

          <Modal open={openCommentBox} setOpen={setOpenCommentBox}>
            <CommentsBox post={post} setOpen={setOpenCommentBox} />
          </Modal>

          {currentUser && currentUser.uid === post.userId && (
            <div>
              <IconButton color="primary" onClick={() => setEdited(!edited)}>
                <EditIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </CardContent>
    </StyledCard>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
  rest: PropTypes.any,
};

export default PostCard;
