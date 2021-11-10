import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import axiosInstance from '../axios';


const useStyles = makeStyles((theme) => ({
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	articleTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	articleText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
    },
    submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function ArticleForm() {
    const classes = useStyles();
    const history = useHistory();
	const initialFormData = Object.freeze({
		title: '',
		content: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
    };

    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
        const username = localStorage.getItem('username', null)
		axiosInstance.post(`article-create?username=${username}`, {
			title: formData.title,
            content: formData.content,
		}).then((res) => {
			history.push('/');
			console.log(res);
			console.log(res.data);
		});
	};

    return (
        <form>
            <Grid container spacing={5} alignItems="flex-end">
                <Grid item xs={12} md={12}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Title"
                                name="title"
                                autoComplete="name"
								onChange={handleChange}
							/>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                className={classes.articleTitle}
                            >
                                Content:
                            </Typography>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                required
                                style={{ width: 880, marginTop: 10 }}
                                id="content"
								label="content"
                                name="content"
                                onChange={handleChange}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={handleSubmit}
			>
				Save
			</Button>
        </form>
    );
}

export default ArticleForm;
